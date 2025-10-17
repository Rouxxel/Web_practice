const team_members = [
    {
        name: "John Doe",
        position: "CEO",
        phone: "+49 123 12345678",
        email: "dummyemail@xmail.com",
        img: "assets/images/pfp.png"
    },
    {
        name: "Jane Doe",
        position: "CTO",
        phone: "+49 123 12345678",
        email: "dummyemail@xmail.com",
        img: "assets/images/pfp.png"
    },
    {
        name: "Janet Doe",
        position: "Marketing Manager",
        phone: "+49 123 12345678",
        email: "dummyemail@xmail.com",
        img: "assets/images/pfp.png"
    },
    {
        name: "Johnathan Doe",
        position: "HR Manager",
        phone: "+49 123 12345678",
        email: "dummyemail@xmail.com",
        img: "assets/images/pfp.png"
    }
];

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("team_members_container");

    team_members.forEach(member => {
        const member_div = document.createElement("div");
        member_div.classList.add("member");

        member_div.innerHTML = `
        <img src="${member.img}" alt="team_member" class="member_img_file">
        <h5 class="member_name">${member.name}</h5>
        <h6 class="position">${member.position}</h6>
        <h6 class="phone_num">${member.phone}</h6>
        <h6 class="email_addr">${member.email}</h6>
        `;

        container.appendChild(member_div);
    });
});