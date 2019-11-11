<template>
    <div class="pi-container">
        <section class="error">
            <h1 class="error-code">404</h1>
            <p class="error-msg">Page Not Found</p>
        </section>
    </div>
</template>

<style lang="stylus" scoped>
.error {
    font-weight: bold;
    margin: 20px;

    &-code {
        font-size: 45px;
        height: 45px;
        line-height: 45px;
        margin: 0;
        opacity: 0.3;
    }

    &-msg {
        font-size: 18px;
        margin: 5px 0 0;
        opacity: 0.9;
    }
}
</style>