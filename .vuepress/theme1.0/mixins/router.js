export default {
    created() {
        console.log('router mixin created');
    },
    methods: {
        forward(path) {
            event.preventDefault();
            if (/^(https?:)?\/\//.test(path)) {
                location.href = path;
                return;
            }
            this.$router.push({
                path
            });
        }
    }
}