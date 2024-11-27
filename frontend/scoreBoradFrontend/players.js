const getAllPlayers = () => {
    try {
        $.ajax({
            type: 'GET',
            url: 'http://localhost:4000/api/players/all-players',
            headers: {
                'Content-Type': 'application/json'
            },
            success: (data) => {
                console.log(data);

                if (data) {
                    appendDataToOptions(data?.players);
                }

            }
        })
    } catch (error) {
        console.log(error);

    }
}





// const handleShowModal = () => {
//     modal.style.display = 'block'
//     closeButton.onclick = () => {
//         modal.style.display = "none";
//         const encrypted_uuid = '{{unique_id_close}}'
//     }
//     try {
//         $.ajax({
//             type: 'POST',
//             url: `http://localhost:8005/closeLog/${encrypted_uuid}`,
//             headers: {
//                 'Content-Type': 'application/json',
//                 'X-CSRFToken': getCookie('csrftoken')
//             },
//             data: { category: 'close' },
//             success: (data) => {

//                 if (data.status === 'success') {
//                     console.log("data updated successfully!");

//                 }

//             }
//         })
//     } catch (error) {
//         console.log(error);

//     }
// }