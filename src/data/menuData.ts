export interface Dish {
  nombre: string;
  descripcion?: string;
  imagen?: string;
  precio: string;
}

export interface Category {
  id: string;
  nombre: string;
  items: Dish[];
}

export const DEFAULT_MENU_DATA: Category[] = [
  {
    id: "ceviches",
    nombre: "Ceviches",
    items: [
      { nombre: "Ceviche de Toyo", descripcion: "", precio: "S/. 25.00", imagen: "" },
      { nombre: "Ceviche Mixto", descripcion: "", precio: "S/. 30.00", imagen: "" },
      { nombre: "Ceviche Carretillero", descripcion: "", precio: "S/. 30.00", imagen: "" },
      { nombre: "Ceviche de Conchas Negras", descripcion: "", precio: "S/. 40.00", imagen: "" },
      { nombre: "Leche de Tigre Simple", descripcion: "", precio: "S/. 15.00", imagen: "" },
      { nombre: "Leche de Tigre Mega Especial", descripcion: "", precio: "S/. 20.00", imagen: "" },
      { nombre: "Leche de Pantera", descripcion: "", precio: "S/. 25.00", imagen: "" },
      { nombre: "Papa Huancaina + Ceviche", descripcion: "", precio: "S/. 10.00", imagen: "" },
      { nombre: "Papa Rellena + Ceviche", descripcion: "", precio: "S/. 10.00", imagen: "" },
      { nombre: "Tortilla de Choclo + Ceviche", descripcion: "", precio: "S/. 15.00", imagen: "" },
      { nombre: "Causa Acevichada", descripcion: "", precio: "S/. 20.00", imagen: "" },
      { nombre: "Causa Montada", descripcion: "", precio: "S/. 25.00", imagen: "" },
      { nombre: "Canastitas Mixtas/Ceviche y Cecina", descripcion: "", precio: "S/. 25.00", imagen: "" }
    ]
  },
  {
    id: "combos",
    nombre: "Combos",
    items: [
      { nombre: "Combo Caleta", descripcion: "Ceviche + Arroz con Marisco + Chicharrón de Pescado", precio: "S/. 35.00", imagen: "" },
      { nombre: "Dúos Marinos", descripcion: "Elige tu Combinación", precio: "S/. 30.00", imagen: "" },
      { nombre: "Ronda Marina", descripcion: "Ceviche Mixto + Arroz con Marisco + Chicharrón de Pescado + Tortilla de Choclo + Causa", precio: "S/. 60.00", imagen: "" },
      { nombre: "Dúo Amazónico", descripcion: "Ceviche + Cecina + Chorizo + Patacones", precio: "S/. 30.00", imagen: "" }
    ]
  },
  {
    id: "arroces",
    nombre: "Arroces",
    items: [
      { nombre: "Arroz con Marisco", descripcion: "", precio: "S/. 25.00", imagen: "" },
      { nombre: "Arroz con Langostino", descripcion: "", precio: "S/. 40.00", imagen: "" },
      { nombre: "Chaufa de Mariscos", descripcion: "", precio: "S/. 25.00", imagen: "" },
      { nombre: "Chaufa Regional", descripcion: "", precio: "S/. 25.00", imagen: "" }
    ]
  },
  {
    id: "chicharrones",
    nombre: "Chicharrones",
    items: [
      { nombre: "Chicharrón de Pescado", descripcion: "", precio: "S/. 30.00", imagen: "" },
      { nombre: "Chicharrón Mixto", descripcion: "", precio: "S/. 40.00", imagen: "" },
      { nombre: "Chicharrón de Pota", descripcion: "", precio: "S/. 25.00", imagen: "" },
      { nombre: "Chicharrón de Pollo", descripcion: "", precio: "S/. 20.00", imagen: "" }
    ]
  },
  {
    id: "frituras",
    nombre: "Frituras",
    items: [
      { nombre: "Cabrilla Frita", descripcion: "", precio: "S/. 35.00", imagen: "" },
      { nombre: "Jalea Simple", descripcion: "", precio: "S/. 30.00", imagen: "" },
      { nombre: "Jalea Mixta", descripcion: "", precio: "S/. 35.00", imagen: "" }
    ]
  },
  {
    id: "sopas",
    nombre: "Sopas",
    items: [
      { nombre: "Sudado", descripcion: "", precio: "S/. 30.00", imagen: "" },
      { nombre: "Parihuela", descripcion: "", precio: "S/. 40.00", imagen: "" },
      { nombre: "Chupe de Pescado", descripcion: "", precio: "S/. 30.00", imagen: "" },
      { nombre: "Chupe Mixto", descripcion: "", precio: "S/. 35.00", imagen: "" }
    ]
  },
  {
    id: "sabados-y-domingos",
    nombre: "Sábados y Domingos",
    items: [
      { nombre: "Cuy Frito con Papas Guisadas", descripcion: "", precio: "S/. 25.00", imagen: "" },
      { nombre: "Carne Seca con ...", descripcion: "NO DISPONIBLE", precio: "No disponible", imagen: "" },
      { nombre: "Pato Guisado", descripcion: "", precio: "S/. 20.00", imagen: "" },
      { nombre: "Arroz con Pato", descripcion: "", precio: "S/. 20.00", imagen: "" }
    ]
  }
];

