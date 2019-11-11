<template>
    <div class="pi-container">
        <header>
            <Content slot-key="header" />
        </header>
        <main class="pi-main">
            <article>
                <header v-if="$route.path !== '/'">
                    <h1>{{$page.title}}</h1>
                    <section class="pi-meta">
                        <time>2019/10/04</time> /
                        <span>unofficial</span>
                    </section>
                </header>
                <figure></figure>
                <section>
                    <Content />
                </section>
            </article>
        </main>
        <footer>
            <Content slot-key="footer" />
            <Music v-if="$page.frontmatter.music" :music="$page.frontmatter.music" />
        </footer>
    </div>
</template>

<script>
import Music from "../components/Music";

export default {
    components: {
        Music
    },
    created() {
        // console.log(this);
    }
};
</script>

<style lang="stylus" scoped></style>