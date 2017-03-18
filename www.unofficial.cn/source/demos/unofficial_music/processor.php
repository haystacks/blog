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
	// preg_match_all("/songlist=\[(.*)\];/", $content['content'], $rs);
	// $rsArr = json_decode($rs[1][0], true);

	// 创建一个文件 /attachment/api.php
	// require '../addons/unofficial_music/do.php';

	//A: 点歌
	//B: 请输入歌名？
	//A: 东风破
	//B: 请输入留言？
	//A: 好想你，好想你，好想真的告诉你
	//B: 返回歌曲信息，动态链接，关联数据ID

	public function respond() {
		$message = $this -> message;
		if(!$this -> inContext) { // 点歌触发
			// 创建一条点歌送祝福记录
			$this -> addRecord();
			$reply = '请输入歌名？';
            $this->beginContext(1800);
		} else {
			// 回复了歌名
			// 检查数据库歌名是否存在
			// 1. 不存在，要求回复歌名
			// 2. 存在，要求回复留言
			$info = $this -> getMusic();
			if(!$info['mid'] && !$info['blessing']) {
				// 更新最新记录的歌名
				// 查询歌曲ID 
				$mid = $this -> getMid($message['content']);
				$this -> updateMid($mid);
				$reply = '请输入留言？';
			} elseif($info['mid'] && !$info['blessing']) {
				$this -> endContext();
				// 更新最新记录的祝福
				$this -> updateBlessing($message['content']);
				// 搜索歌名，获得歌名ID，查询歌曲信息
				$rs = $this -> idToLink($info['mid']);
				// 更新歌曲库
				$this -> updateMuiscDetail($rs);
				return $this->respMusic(array(
					'Title'       => $rs['songinfo']['title'].'-'.$rs['songinfo']['author'],
					'Description' => $message['content'],
					'MusicUrl'    => 'api.php?mid='.$rs['songinfo']['song_id']
				));
			}
		}
		return $this->respText($reply);
	}

	// 数据库中查询用户是否点歌
	public function getMusic() {
		$message = $this -> message;
		$sql = 'select * from '.tablename('unofficial_music').' order by time desc where :user = user';
		$data = array(
			'user' => $message['from']
		);
		return pdo_fetch($sql, $data);
	}

	// 添加一条新纪录
	private function addRecord() {
		$message = $this -> message;
		$sql = 'insert into '.tablename('unofficial_music').' (`user`) values(":user")';
		return $sql;
		$data = array(
			'user' => $message['from']
		);
		pdo_query($sql, $data);
	}

	// 更新unofficial_music表的mid
	private function updateMid($mid) {
		$message = $this -> message;
		$sql = 'update '.tablename('unofficial_music').' set mid = :mid where user = :user order by time desc limit 0, 1';
		$data = array(
			'mid'  => $mid,
			'user' => $message['from']
		);
		return pdo_query($sql, $data);
	}

	// 更新unofficial_music表的blessing
	private function updateBlessing($blessing) {
		$message = $this -> message;
		$sql = 'update '.tablename('unofficial_music').' set blessing = :blessing where user = :user order by time desc limit 0, 1';
		$data = array(
			'blessing'  => $blessing,
			'user' => $message['from']
		);
		return pdo_query($sql, $data);
	}

	// 更新歌曲库
	private function updateMusicDetail($rs) {
		$sql = 'replace into '.tablename('unofficial_music_detail').' (`mid`, `title`, `author`, `link`) values(":mid", ":title", ":author", ":link")';
		$data = array(
			'mid'    => $rs['songinfo']['song_id'],
			'title'  => $rs['songinfo']['title'],
			'author' => $rs['songinfo']['author'],
			'link'   => $rs['bitrate']['file_link']
		);
		return pdo_query($sql, $data);
	}
	// 通过用户输入的歌名查询歌曲是否存在
	private function getMid($keyword) {
		$url = "http://music.baidu.com/search/{$keyword}";
		$content = ihttp_get($url);
		preg_match("/(?<=data-sid=\")\d+(?=\")/", $content['content'], $rs);
		if(empty($rs[0][0])) {
			return false;
		} else {
			return $rs[0][0];
		}
	}

	// 通过 songid 查询歌曲
	private function idToLink($songid) {
		$url = "http://musicapi.qianqian.com/v1/restserver/ting?from=webapp_music&method=baidu.ting.song.playAAC&format=jsonp&callback=song_playAAC&songid={$songid}&s_protocol=&_={time()}";
		$content = ihttp_get($url);
		preg_match("/\/\*\*\/song_playAAC\((.*)\);/", $content['content'], $rs);
		$rsArr = json_decode($rs[1], true);
		return $rsArr;
	}
}