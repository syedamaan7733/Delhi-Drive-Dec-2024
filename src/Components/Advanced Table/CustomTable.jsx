import React, { useState, useMemo, useCallback } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

export const CustomTable = () => {
  const data = [
    {
      id: 1,
      name: "Rahul Sharma",
      age: 30,
      email: "rahul.sharma@example.com",
      phone: "+919669123466",
    },
    {
      id: 2,
      name: "Priya Patel",
      age: 25,
      email: "priya.patel@example.com",
      phone: "+919876543210",
    },
    {
      id: 3,
      name: "Amit Gupta",
      age: 35,
      email: "amit.gupta@example.com",
      phone: "+919887766554",
    },
    {
      id: 4,
      name: "Neha Singh",
      age: 28,
      email: "neha.singh@example.com",
      phone: "+919765432198",
    },
    {
      id: 5,
      name: "Vikram Reddy",
      age: 42,
      email: "vikram.reddy@example.com",
      phone: "+919988776655",
    },
    {
      id: 6,
      name: "Anjali Mehta",
      age: 33,
      email: "anjali.mehta@example.com",
      phone: "+919112233445",
    },
    {
      id: 7,
      name: "Sanjay Kumar",
      age: 39,
      email: "sanjay.kumar@example.com",
      phone: "+919445566778",
    },
    {
      id: 8,
      name: "Kavita Joshi",
      age: 27,
      email: "kavita.joshi@example.com",
      phone: "+919334455667",
    },
    {
      id: 9,
      name: "Rajesh Malhotra",
      age: 45,
      email: "rajesh.malhotra@example.com",
      phone: "+919667788990",
    },
    {
      id: 10,
      name: "Deepa Naidu",
      age: 31,
      email: "deepa.naidu@example.com",
      phone: "+919556677889",
    },
    {
      id: 11,
      name: "Arun Verma",
      age: 36,
      email: "arun.verma@example.com",
      phone: "+919223344556",
    },
    {
      id: 12,
      name: "Swati Desai",
      age: 29,
      email: "swati.desai@example.com",
      phone: "+919778899001",
    },
    {
      id: 13,
      name: "Vishal Rao",
      age: 37,
      email: "vishal.rao@example.com",
      phone: "+919889900112",
    },
    {
      id: 14,
      name: "Shruti Kapoor",
      age: 26,
      email: "shruti.kapoor@example.com",
      phone: "+919990011223",
    },
    {
      id: 15,
      name: "Raj Khanna",
      age: 41,
      email: "raj.khanna@example.com",
      phone: "+919112233445",
    },
    {
      id: 16,
      name: "Pooja Bose",
      age: 32,
      email: "pooja.bose@example.com",
      phone: "+919334455667",
    },
    {
      id: 17,
      name: "Manish Tiwari",
      age: 38,
      email: "manish.tiwari@example.com",
      phone: "+919445566778",
    },
    {
      id: 18,
      name: "Divya Chatterjee",
      age: 24,
      email: "divya.chatterjee@example.com",
      phone: "+919556677889",
    },
    {
      id: 19,
      name: "Karthik Iyer",
      age: 43,
      email: "karthik.iyer@example.com",
      phone: "+919667788990",
    },
    {
      id: 20,
      name: "Lakshmi Nair",
      age: 30,
      email: "lakshmi.nair@example.com",
      phone: "+919778899001",
    },
    {
      id: 21,
      name: "Suresh Krishnan",
      age: 34,
      email: "suresh.krishnan@example.com",
      phone: "+919889900112",
    },
    {
      id: 22,
      name: "Priyanka Banerjee",
      age: 28,
      email: "priyanka.banerjee@example.com",
      phone: "+919990011223",
    },
    {
      id: 23,
      name: "Abhishek Mishra",
      age: 40,
      email: "abhishek.mishra@example.com",
      phone: "+919112233445",
    },
    {
      id: 24,
      name: "Riya Choudhury",
      age: 33,
      email: "riya.choudhury@example.com",
      phone: "+919223344556",
    },
    {
      id: 25,
      name: "Naveen Pillai",
      age: 36,
      email: "naveen.pillai@example.com",
      phone: "+919334455667",
    },
  ];

  const columns = [
    {
      title: "ID",
      key: "id",
      sortable: true,
      filterable: true,
    },
    {
      title: "Name",
      key: "name",
      sortable: true,
      filterable: true,
    },
    {
      title: "Age",
      key: "age",
      sortable: true,
    },
    {
      title: "Email",
      key: "email",
      filterable: true,
    },
    {
      title: "Phone",
      key: "phone",
      filterable: true,
    },
  ];

  const styles = {
    headerBgColor: "black",
    headerFontColor: "white",
    bodyBgColor: "#f8f9fa",
    headerFontSize: "18px",
    bodyFontSize: "16px",
  };

  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: null,
  });
  const [filters, setFilters] = useState({});

  // Sorting logic
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key])
        return sortConfig.direction === "asc" ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key])
        return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  // Filtering logic
  const filteredData = useMemo(() => {
    return sortedData.filter((row) =>
      Object.entries(filters).every(
        ([key, value]) =>
          value === "" ||
          row[key].toString().toLowerCase().includes(value.toLowerCase())
      )
    );
  }, [sortedData, filters]);

  // Sorting handler
  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key !== key) return { key, direction: "asc" };
      if (prev.direction === null) return { key, direction: "asc" };
      if (prev.direction === "asc") return { key, direction: "desc" };
      return { key: "", direction: null };
    });
  };

  // Filter handler
  const handleFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div
      className="custom-table-container"
      style={{
        fontSize: styles.bodyFontSize || "16px",
        backgroundColor: styles.bodyBgColor || "white",
        color: styles.bodyFontColor || "black",
      }}
    >
      <div className="overflow-y-auto stylish-scrollbar max-h-[80vh]">
        <caption className="relative flex gap-4 text-3xl font-bold text-stone-800  mb-4 text-center left-[35%]">
          <p>XYZ Employees List</p>
        </caption>
        <table className=" w-full border-collapse">
          {/* Table Header */}
          <thead
            style={{
              backgroundColor: styles.headerBgColor || "#f4f4f4",
              color: styles.headerFontColor || "black",
              fontSize: styles.headerFontSize || "18px",
            }}
          >
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="p-2 border text-left cursor-pointer"
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center">
                    {column.title}
                    {column.sortable && (
                      <div className="ml-2">
                        {sortConfig.key === column.key &&
                          (sortConfig.direction === "asc" ? (
                            <ChevronUp size={16} />
                          ) : sortConfig.direction === "desc" ? (
                            <ChevronDown size={16} />
                          ) : null)}
                      </div>
                    )}
                  </div>
                  {column.filterable && (
                    <input
                      type="text"
                      placeholder={`Filter ${column.title}`}
                      className="w-full mt-2 p-1 text-slate-500 border"
                      value={filters[column.key] || ""}
                      onChange={(e) => handleFilter(column.key, e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  )}
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {filteredData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`${
                  rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100`}
              >
                {columns.map((column) => (
                  <td key={`${rowIndex}-${column.key}`} className="p-2 border">
                    {row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Optional: Empty state */}
      {filteredData.length === 0 && (
        <div className="text-center p-4 text-gray-500">No data available</div>
      )}
    </div>
  );
};
