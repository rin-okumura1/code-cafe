let regex=/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i
let botonSumbit=document.getElementById("button")
let form    =document.forms.form
let formData={}
function update(){
    formData={name:form.name.value,
    surname:form.surname.value,
    email:form.email.value,
    interesado:form.interesado.value,}
}


botonSumbit.addEventListener('click',(e,)=>{
    update()
    console.log(formData)
if(!validateCampos()){
    alert("revise los campos")
    e.preventDefault()
}

}

)
function validateCampos(){
   return regex.test(formData.email)&&formData.surname.length>0&&formData.interesado.length>0&&formData.name.length>0
}