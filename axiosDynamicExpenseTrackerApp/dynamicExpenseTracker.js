//creating ID to store id of object to be edited
let ID;
function editid(id)
{
    ID=id;
}


async function saveToServer(e)
{
    try
    {
    e.preventDefault()

    let amount=e.target.expense_amount.value;
    let description=e.target.description_.value;
    let category=e.target.category_.value;

    let obj={
        amount,
        description,
        category
    }

    if(ID)  
    {
       let res= await axios.put(`https://crudcrud.com/api/7ecbc6b6c89247d2a5a9414e9c719e97/expenseTrack/${ID}`,obj)  // on submit edit form put request will be sent
       try
       {
        onScreenAfterEdit()
       }
       catch(err)
       {
        console.log(err)
       }
        // .then((res)=>
        // {
        //     onScreenAfterEdit()
        // })
        // .catch((err)=>
        // {
        //     console.log(err)
        // })
    }
    else
    {
        let res=axios.post("https://crudcrud.com/api/7ecbc6b6c89247d2a5a9414e9c719e97/expenseTrack",obj)  // on submit fresh form post requet will be sent
        try
        {
            onScreen(res.data)
        }
        catch(err)
        {
            console.log(err)
        }
        // .then((res)=>
        // {
        //     onScreen(res.data)
        // })
        // .catch((err)=>
        // {
        //     console.log(err)
        // })
        }
    
    }
    catch(err)
    {
        console.log(err)
    }
}

// DOMContentLoaded fire when page refreshed, will get all stored data from server

window.addEventListener('DOMContentLoaded',onload)

async function onload(e)
{
    let res=await axios.get("https://crudcrud.com/api/7ecbc6b6c89247d2a5a9414e9c719e97/expenseTrack")
    try
    {
        res.data.forEach((key)=>
        {
            onScreen(key)
        })
    }
    catch(err)
    {
        console.log(err)
    }
    // .then((res)=>
    // {
    //     res.data.forEach((key)=>
    //     {
    //         onScreen(key)
    //     })
    // })
    // .catch((err)=>
    // {
    //     console.log(err)
    // })
}

//after edit , edit object will be reprinted on screen
async function onScreenAfterEdit()
{
    let res=await axios.get(`https://crudcrud.com/api/7ecbc6b6c89247d2a5a9414e9c719e97/expenseTrack/${ID}`)
    try
    {
        onScreen(res.data)
        ID=''
    }
    catch(err)
    {
        console.log(err)
    }
    // .then((res)=>
    // {
    //     onScreen(res.data)
    //     ID=''                // clearing ID to prevent repeat put request
    // })
}


//for printing data on screen after sending to server
function onScreen(obj)
{
    let parent=document.getElementById('details');
    let childNode=`<li  id=${obj._id}> Amount : ${obj.amount}-Description : ${obj.description}-Category : ${obj.category} 
    <button  onclick=deleteData('${obj._id}')>Delete</button>
    <button  onclick=editData('${obj._id}','${obj.amount}','${obj.description}','${obj.category}') >Edit</button></li>`
    parent.innerHTML=childNode+parent.innerHTML
}


function editData(id,amount,des,cat)
{
    document.getElementById('amount').value=amount;
    document.getElementById('description').value=des;
    document.getElementById('category').value=cat;

    removeFromScreen(id);
    editid(id);             // calling editid() declared above to store id of particular object to be edited
}

async function deleteData(id)
{
    let res=await axios.delete(`https://crudcrud.com/api/7ecbc6b6c89247d2a5a9414e9c719e97/expenseTrack/${id}`)
    try
    {
        removeFromScreen(id)
    }
    catch(err)
    {
        console.log(err)
    }
    // .then((res)=>
    // {
    //     removeFromScreen(id)
    // })
    // .catch((err)=>
    // {
    //     console.log(err)
    // })
}



function removeFromScreen(id)
{
    let parent=document.getElementById('details');
    let child=document.getElementById(id);
    if(child)
    {
        parent.removeChild(child);
    }
}

//pushing