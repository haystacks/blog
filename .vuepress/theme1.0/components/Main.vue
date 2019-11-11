<template>
    <main>
        <Header />
        <article>
            <slot />
        </article>
        <Footer />
    </main>
</template>

<script>
import Header from '@theme/components/Header';
import Footer from '@theme/components/Footer';
export default {
    components: {
        Header,
        Footer
    }
}
</script>
