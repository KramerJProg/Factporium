
// Selecting DOM elements.
const btn = document.querySelector(".btn-open");
const form = document.querySelector(".fact-form");
const factsList = document.querySelector(".facts-list");

// Create DOM elements : Render facts in list.
factsList.innerHTML = "";

// Load data from Supabase.
loadFacts();

async function loadFacts() {
    const res = await fetch("https://rxlgojnmxfechnupltaz.supabase.co/rest/v1/facts", {
        headers: {
            apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4bGdvam5teGZlY2hudXBsdGF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDEwMzgyOTUsImV4cCI6MjAxNjYxNDI5NX0.-4PG7ztIBZTboV37ZSwlfOmLGkhKv89ZxlUTNZvoZu4",
            authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4bGdvam5teGZlY2hudXBsdGF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDEwMzgyOTUsImV4cCI6MjAxNjYxNDI5NX0.-4PG7ztIBZTboV37ZSwlfOmLGkhKv89ZxlUTNZvoZu4",
        },
    });
    const data = await res.json();
    const filteredData = data.filter((fact) => fact.category === "society");

    console.log(data);
}

// Toggle form visibility.
btn.addEventListener("click", function () {
    if (form.classList.contains("hidden")) {
        form.classList.remove("hidden");
        btn.textContent = "Close";
    } else {
        form.classList.add("hidden");
        btn.textContent = "Share a fact";
    }
});

