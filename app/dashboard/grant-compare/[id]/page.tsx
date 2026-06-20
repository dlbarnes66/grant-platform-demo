<button
  onClick={async () => {
    const existing = JSON.parse(localStorage.getItem("compare") || "[]");

    if (!existing.includes(grant.id)) {
      existing.push(grant.id);
      localStorage.setItem("compare", JSON.stringify(existing));
    }

    alert("Added to comparison list!");
  }}
  className="px-4 py-2 bg-brandBlue text-white rounded-lg hover:bg-brandGold hover:text-black transition"
>
  Compare
</button>
