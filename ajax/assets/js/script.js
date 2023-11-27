let url='  http://localhost:3000/products';
var cont='';
var mainData=[];
// get calling 
function loadData() {
    $.ajax({
        url: url,
        method: 'GET',
        dataType: 'json',
        success: function(response) {
            let data = response;
            mainData = data;
            console.log(mainData);
            getData();
        },
        error: function(error) {
            console.error("Error loading data:",error);
        }
    });
}

function getData(){
   
    mainData.forEach(product=>{
   
        cont+=`<tr >
            <th scope="row">${product.id}</th>
            <td>${product.name}</td>
            <td>${product.status}</td>
            <td><button class="btn text-primary" onclick='upd(${product.id})'><i class="fa fa-edit" style="font-size:25px"></i></button></td>
            <td><button class="btn text-danger" onclick='deleteRecord(${product.id})'><i class="material-icons" style="font-size:25px">delete</i></button></td>
          </tr>`
      })
      document.getElementById('bodyy').innerHTML=cont;
}
// post the data 
function sendData(){
    let id1=$("#uId").val();
    var id2 = parseInt(id1);
    let name1=$("#name").val();
    let status1=$("#status").val();
    if(id1===''&&name1===''&&status1===''){
        alert("Please give all the iput form fields");
    }
    else{


    
        let insert = { id: id2, name: name1, status: status1 };
        $.ajax({
            type: 'POST',
            url: url,
            data: JSON.stringify(insert),
            contentType: 'application/json',
            success: function(response) {
                // Assuming the server response is in JSON format
                const data = response;
                mainData.push(data);
            },
            error: function(error) {
                console.error('Error adding information:', error);
                alert("Use Unique Id");
            }
        });  
    }
}
// put method
function upd(id){
    console.log(id);
    let mm = mainData.find(item => item.id === id);
    console.log(id, "      ", mainData);
    console.log("mm ", mm);
    $("#uId").val(mm.id);
    $("#name").val(mm.name);
    $("#status").val(mm.status);
    
    $("#ubtn").css("display", "block");
    $("#sebtn").css("display", "none");
    $("#uppH").css("display", "block");
    $("#instH").css("display", "none");
    let btn = $("#ubtn");
    btn.on('click', function(event) 
    {
        let idd = $("#uId").val();
        let name = $("#name").val();
        let branch1 = $("#status").val();
        if(idd===''&&name===''&&branch1===''){
            alert("Please Dont give empty fields..!");
        }
        else
        {
                let data = { id: idd, name: name, status: branch1 };
            console.log("Updating data:", data);

            $.ajax({
                type: 'PUT',
                url: `${url}/${id}`,
                data: JSON.stringify(data),
                contentType: 'application/json',
                success: function(response) {
                    const updatedData = response;
                    console.log("Updated data:", updatedData);

                    $("#uId").val('');
                    $("#name").val('');
                    $("#status").val('');

                    $("#ubtn").hide();
                },
                error: function(error) {
                    alert(error);
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
                
                
        }
    });

    
}
// delete data
function deleteRecord(id) {
    alert("The data is deleted...!");

    $.ajax({
        url: `${url}/${id}`,
        type: 'DELETE',
        success: function (data) {
            // Handle the success response, if needed
            console.log("datata antaa",data);
        },
        error: function (error) {
            console.error('Error:', error);
        }
    });

}

