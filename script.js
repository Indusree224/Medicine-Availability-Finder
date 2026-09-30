const medicines = [
  { name: "Paracetamol 500mg", category: "Pain Relief", pharmacy: "Sri Sai Pharmacy", location: "Chittoor", stock: 24 },
  { name: "Cetirizine 10mg", category: "Allergy", pharmacy: "Apollo Pharmacy", location: "Tirupati", stock: 12 },
  { name: "Azithromycin 500mg", category: "Antibiotic", pharmacy: "MedPlus", location: "Kadapa", stock: 0 },
  { name: "Omeprazole 20mg", category: "Gastric", pharmacy: "HealthCare Pharmacy", location: "Chittoor", stock: 18 },
  { name: "Amoxicillin 500mg", category: "Antibiotic", pharmacy: "Sri Lakshmi Pharmacy", location: "Tirupati", stock: 8 }
];

const list = document.getElementById("medicineList");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const message = document.getElementById("message");

function displayMedicines() {
  const term = searchInput.value.trim().toLowerCase();
  const category = categoryFilter.value;

  const results = medicines.filter(m =>
    m.name.toLowerCase().includes(term) &&
    (category === "all" || m.category === category)
  );

  list.innerHTML = "";

  if (results.length === 0) {
    message.textContent = "No matching medicine record was found.";
    return;
  }

  message.textContent = `${results.length} medicine record(s) found.`;

  results.forEach(m => {
    const card = document.createElement("div");
    card.className = "card";
    const status = m.stock > 0 ? "Available" : "Currently unavailable";
    const statusClass = m.stock > 0 ? "available" : "unavailable";

    card.innerHTML = `
      <h3>${m.name}</h3>
      <p><strong>Category:</strong> ${m.category}</p>
      <p><strong>Pharmacy:</strong> ${m.pharmacy}</p>
      <p><strong>Location:</strong> ${m.location}</p>
      <p><strong>Stock:</strong> ${m.stock}</p>
      <p class="${statusClass}">${status}</p>
    `;
    list.appendChild(card);
  });
}

document.getElementById("searchBtn").addEventListener("click", displayMedicines);
searchInput.addEventListener("input", displayMedicines);
categoryFilter.addEventListener("change", displayMedicines);

document.getElementById("bookingForm").addEventListener("submit", function(e) {
  e.preventDefault();
  document.getElementById("bookingMessage").textContent =
    "Request submitted successfully for availability checking.";
  this.reset();
});

document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();
  document.getElementById("contactStatus").textContent =
    "Thank you. Your message has been recorded for this demonstration.";
  this.reset();
});

displayMedicines();