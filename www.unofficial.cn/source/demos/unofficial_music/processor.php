<?php
/**
 * 点歌送祝福模块处理程序
 *
 * @author unofficial
 * @url http://www.unofficial.cn/
 */
defined('IN_IA') or exit('Access Denied');
class Unofficial_musicModuleProcessor extends WeModuleProcessor {

	// qq
	// ulr http://c.y.qq.com/v8/playsong.html?songmid=003uEbEr0jcW7c
	// preg_match_all("/songlist=\[(.*)\];/", $content, $rs);
	// $rsArr = json_decode($rs[1][0], true);

	// 创建一个文件 /attachment/api.php
	// require '../addons/unofficial_music/do.php';

	//A: 点歌
	//B: 请输入歌名？
	//A: 东风破
	//B: 请输入祝福语？
	//A: 好想你，好想你，好想真的告诉你
	//B: 返回歌曲信息，动态链接，关联数据ID

	public function respond() {
		$message = $this -> message;
		if(!$this -> inContext) { // 点歌触发
			// 创建一条点歌送祝福记录
			$rs = $this -> addRecord();
			if(!empty($rs)) {
				// 如果能匹配到 ^点歌+内容
				preg_match('/^点歌\+?(.*)/', $message['content'], $matches);
				if(!empty($matches[1])) {
					$mid = $this -> getMid($matches[1]);
					$this -> updateMid($mid);
					$reply = '请输入祝福语？';
				} else {
					$reply = '请输入歌名？';
				}
            	$this -> beginContext(1800);
			} else {
				$reply = '系统故障，请稍候再试';
			}
			
		} else {
			// 回复了歌名
			// 检查数据库歌名是否存在
			// 1. 不存在，要求回复歌名
			// 2. 存在，要求回复留言
			preg_match('/^退出\+?(.*)/', $message['content'], $matches);
			if(!empty($matches)) {
				$this -> endContext();
				$reply = '你已退出点歌模式';
			} else {
				$info = $this -> getMusic();
				if(!$info['mid'] && !$info['blessing']) {
					// 更新最新记录的歌名
					// 查询歌曲ID 
					$mid = $this -> getMid($message['content']);
					$this -> updateMid($mid);
					$reply = '请输入祝福语？';
				} elseif($info['mid'] && !$info['blessing']) {
					$this -> endContext();
					// 更新最新记录的祝福
					$this -> updateBlessing($message['content']);
					// 搜索歌名，获得歌名ID，查询歌曲信息
					$rs = $this -> idToLink($info['mid']);
					// 更新歌曲库
					$this -> addMusicDetail($rs);
					return $this->respMusic(array(
						'Title'       => $rs['songinfo']['title'].'-'.$rs['songinfo']['author'],
						'Description' => $message['content'],
						'MusicUrl'    => 'api.php?id='.$info['id'].'&i=3'
					));
				}
			}
			
		}
		return $this->respText($reply);
	}

	// 数据库中查询用户是否点歌
	public function getMusic() {
		$message = $this -> message;
		$sql = 'select * from '.tablename('unofficial_music').' where user = :user order by time desc';
		$data = array(
			'user' => $message['from']
		);
		return pdo_fetch($sql, $data);
	}

	// 添加一条新纪录
	private function addRecord() {
		$message = $this -> message;
		$data = array(
			'user' => $message['from']
		);
		return pdo_insert('unofficial_music', $data);
	}

	// 更新unofficial_music表的mid
	private function updateMid($mid) {
		$message = $this -> message;
		$sql = 'update '.tablename('unofficial_music').' set mid = :mid where user = :user order by time desc limit 1';
		$data = array(
			'mid'  => $mid,
			'user' => $message['from']
		);
		return pdo_query($sql, $data);
	}

	// 更新unofficial_music表的blessing
	private function updateBlessing($blessing) {
		$message = $this -> message;
		$sql = 'update '.tablename('unofficial_music').' set blessing = :blessing where user = :user order by time desc limit 1';
		$data = array(
			'blessing'  => $blessing,
			'user' => $message['from']
		);
		return pdo_query($sql, $data);
	}

	// 更新歌曲库
	private function addMusicDetail($rs) {
		$data = array(
			'mid'    => $rs['songinfo']['song_id'],
			'title'  => $rs['songinfo']['title'],
			'author' => $rs['songinfo']['author'],
			'link'   => $rs['bitrate']['file_link']
		);
		return pdo_insert('unofficial_music_detail', $data, true);
	}
	// 通过用户输入的歌名查询歌曲是否存在
	private function getMid($keyword) {
		load() -> func('communication');
		$url = "http://music.baidu.com/search/{$keyword}";
		$content = $this -> http_get($url);
		preg_match_all("/(?<=data-sid=\")\d+(?=\")/", $content, $rs);
		if(empty($rs[0][0])) {
			return false;
		} else {
			return $rs[0][0];
		}
	}

	// 通过 songid 查询歌曲
	private function idToLink($songid) {
		$url = "http://musicapi.qianqian.com/v1/restserver/ting?from=webapp_music&method=baidu.ting.song.playAAC&format=jsonp&callback=song_playAAC&songid={$songid}&s_protocol=&_={time()}";
		$content = $this -> http_get($url);
		preg_match("/\/\*\*\/song_playAAC\((.*)\);/", $content, $rs);
		$rsArr = json_decode($rs[1], true);
		return $rsArr;
	}

	private function http_get($url) {
		$curl = curl_init();
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($curl, CURLOPT_TIMEOUT, 500);
		curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
		curl_setopt($curl, CURLOPT_URL, $url);
		curl_setopt($curl, CURLOPT_USERAGENT, 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1');
		$res = curl_exec($curl);
		curl_close($curl);
		return $res;
	}
}
