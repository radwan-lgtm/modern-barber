// اختيار الحلاق
function chooseBarber(name){
  localStorage.setItem("barber", name);
  window.location="services.html";
}

// حفظ الخدمات وحساب السعر
function saveServices(){
  let services = document.querySelectorAll(".service-checkbox");
  let selectedServices = [];
  let total = 0;

  services.forEach(s => {
    if(s.checked){
      total += parseInt(s.value);
      selectedServices.push(s.previousElementSibling.textContent);
    }
  });

  if(selectedServices.length === 0){
    alert("اختر خدمة على الأقل");
    return;
  }

  localStorage.setItem("services", selectedServices.join(", "));
  localStorage.setItem("price", total);
  window.location="booking.html";
}

// الحجز
function saveBooking(){
  let date = document.getElementById("date").value;
  let time = document.getElementById("time").value;

  if(!date){
    alert("اختر يوم الحجز");
    return;
  }

  let day = new Date(date).getDay();
  if(day === 1){
    alert("يوم الاثنين إجازة");
    return;
  }

  let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  let exist = bookings.find(b=>b.date===date && b.time===time);
  if(exist){
    alert("هذا الموعد محجوز بالفعل");
    return;
  }

  bookings.push({date,time});
  localStorage.setItem("bookings",JSON.stringify(bookings));
  localStorage.setItem("date", date);
  localStorage.setItem("time", time);

  window.location="summary.html";
}

// عرض ملخص الحجز
if(document.getElementById("barber")){
  document.getElementById("barber").innerText="الحلاق: "+localStorage.getItem("barber");
  document.getElementById("services").innerText="الخدمات: "+localStorage.getItem("services");
  document.getElementById("price").innerText="السعر: "+localStorage.getItem("price")+" جنيه";
  document.getElementById("date").innerText="اليوم: "+localStorage.getItem("date");
  document.getElementById("time").innerText="الساعة: "+localStorage.getItem("time");
}

// إرسال واتساب
function sendWhatsApp(){
  let barber = localStorage.getItem("barber");
  let services = localStorage.getItem("services");
  let price = localStorage.getItem("price");
  let date = localStorage.getItem("date");
  let time = localStorage.getItem("time");

  let message = `حجز جديد في صالون الحلاقة
الحلاق: ${barber}
الخدمات: ${services}
السعر: ${price} جنيه
اليوم: ${date}
الساعة: ${time}`;

  let phone = "201093986925"; // بدون صفر أول + كود الدولة
let url = "https://wa.me/" + phone + "?text=" + encodeURIComponent(message);
window.open(url);
}