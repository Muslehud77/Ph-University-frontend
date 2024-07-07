const adminPaths2 = [

  {
    name: "Dashboard",
    path: "dashboard",
    element:" <AdminDashboard />",
  },
  {
    name: "User Management",
    children: [
      {
        name: "Create Student",
        path: "create-student",
        element: "<CreateStudent />",
      },
      {
        name: "Create Admin",
        path: "create-admin",
        element: "<CreateAdmin />",
      },
      {
        name: "Create Faculty",
        path: "create-faculty",
        element: "<CreateFaculty />",
      },
    ],
  },
];

const newArray = adminPaths2.reduce((acc,item)=>{
   if(item.name && item.path){
    acc.push({key:item.name,label:item.name,path:item.path})
   }
   if(item.children){
    acc.push({key:item.name,label:item.name,children: item.children.map(child=> {
        return {key:child.name,label:child.name,path:child.path}
    })})
   }
   return acc
},[])

// const newArray = adminPaths2.reduce((acc,item)=>{
//    if(item.path && item.element){
//     acc.push({
//         path: item.path,
//         element: item.element
//     })
//    }
//    if(item.children){
//     item.children.forEach(route=> acc.push({path:route.path,element: route.element}))
//    }
//     return acc
// },[])

console.log(JSON.stringify(newArray));