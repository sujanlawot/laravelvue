export default [

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
