export default [
    {
        path:"/s",
        name:"signature",
        component:()=>import("@/js/pages/Signature.vue")
    },
    {
        path:"/user",
        name:"user",
        component:()=>import("@/js/pages/User/Index.vue")
        //

    },

    {
        path:"/",
        name:"test",
        component:()=>import("../components/layouts/undeclaredapp.vue"),
        children:[
            {
                path:"/signature",
                name:"signature",
                component:()=>import("../pages/Signature.vue"),
            }
        ]
    },

]
