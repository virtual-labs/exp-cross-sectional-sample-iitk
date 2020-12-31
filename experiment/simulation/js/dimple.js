document.getElementById("demo1").innerHTML = "1. Select the Sample";
document.getElementById("btn2").style.display = "none";
document.getElementById("btn3").style.display = "none";
function sample_plate(){
    document.getElementById("display_image").src = "../images/disk_alone.PNG";
    document.getElementById("demo2").innerHTML = "2. Combine the two Samples.";
    document.getElementById("btn1").disabled = true;
    document.getElementById("btn2").style.display = "block";
}
function combine_plate(){
    document.getElementById("display_image").src = "../images/disks_combined.PNG";
    document.getElementById("btn2").disabled = true;
    document.getElementById("demo3").innerHTML = "3. Now make circular disk of the sample combined by putting in the brass tube.";
    document.getElementById("btn3").style.display = "block";
}
function circular_disk(){
    document.getElementById("display_image").src = "../images/disk1.PNG";
    document.getElementById("btn3").disabled = true;   
     document.getElementById("demo4").innerHTML = "4. Now Click on the Dimpling Process button."
}
function cylinder_disk(){
    document,getElementById("display_image").src = "../images/disks_cylinder.PNG";
    document.getElementById("nextpage").style.display = "block";
    document.getElementById("demo5").innerHTML = "5. Now click the reset to do it again or move to Ion Milling."

}
function reset(){
    window.location.reload();
}