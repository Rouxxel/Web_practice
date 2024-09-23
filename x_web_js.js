/*Date and time update functions*/
function get_current_time() {
    // Create a new Date object for the current date and time
    let now = new Date();

    // Get the current hour and minutes
    let hours = now.getHours(); // Returns the hour (0-23)
    let minutes = now.getMinutes(); // Returns the minutes (0-59)

    // Add a leading zero to minutes if it's less than 10
    if (minutes < 10) {
        minutes = '0' + minutes;
    }

    document.getElementById('times_display').innerText = hours + ':' + minutes;
}

function get_current_date(){
    let date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    if (day < 10) {
        day = '0' + day;
    }
    if (month < 10) {
        month = '0' + month;
    }

    document.getElementById('date_display').innerText = day + '/' + month + '/' + year;
}

/*Image and subtext update functions*/
let img_files=["imgs/playership.png","imgs/enemyship.png","imgs/enemyship2.png"];
let img_subtexts=["Image by: John Doe", "Image by: Jane Doe", "Image by: Jan Doe"];
let indx=0;

function update_image(button_dir){
    if (button_dir === 'right') {
        if (indx === 2) {
            indx = 0;
        } else {
            indx = indx+1;
        }

    } else if (button_dir === 'left') {
        if (indx === 0) {
            indx = 2;
        } else {
            indx = indx-1;
        }
    }

    //Update the image source
    document.getElementById('ship_sprite').src = img_files[indx];
    
    //Update the subtext
    document.getElementById('image_caption').innerText = img_subtexts[indx];
}

