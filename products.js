Vue.createApp({
    data() {
        return {
            path: 'wern',
            products: [],
            oneProduct: {},
        }
    },
    methods: {
        checkadmin() {  // 驗證使用者是否有登入(有登入取得商品資訊，沒有則返回登入頁面)
            const api = 'https://vue3-course-api.hexschool.io/v2/api/user/check';
            axios.post(api).then((res) => {
                this.getProductsData()
            }).catch((err) => {
                window.location = 'login.html';
            })

        },
        getProductsData() {
            const api = `https://vue3-course-api.hexschool.io/v2/api/${this.path}/admin/products`;
            axios.get(api).then((res) => {
                this.products = res.data.products;
            }).catch((err) => {
                alert(err.response.data.message);
            })
        },
        getOneProduct(item) {
            this.oneProduct = item
        }
    },
    mounted() {
        // 取出 Token(google取得)
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
        // 將token放入headers,只需發送一次(google取得)
        axios.defaults.headers.common.Authorization = token;
        this.checkadmin()
    },
}).mount('#app')