export default [
    {
        path:"/",
        name:"test",
        component:()=>import("../pages/Test.vue"),
    },
    {
        path:"/signature",
        name:"signature",
        component:()=>import("../pages/Signature.vue"),
    }
]
