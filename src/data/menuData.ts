export interface Dish {
  nombre: string;
  descripcion?: string;
  imagen?: string;
  precio: string;
  isDrink?: boolean;
  disponible?: boolean;
  opciones?: string[];
}

export interface Category {
  id: string;
  nombre: string;
  items: Dish[];
}

export const DEFAULT_MENU_DATA: Category[] = [
  {
    id: "ceviches",
    nombre: "Ceviches y Causas",
    items: [
      { nombre: "Ceviche de Toyo", descripcion: "", precio: "S/. 25.00", imagen: "/ceviche_toyo.webp" },
      { nombre: "Ceviche de Caballa", descripcion: "", precio: "S/. 20.00", imagen: "/ceviche_caballa.webp" },
      { nombre: "Ceviche de Palabritas", descripcion: "", precio: "S/. 20.00", imagen: "/ceviche_palabritas.webp" },
      { nombre: "Ceviche langostino", descripcion: "", precio: "S/. 40.00", imagen: "/ceviche_langostino.webp" },
      { nombre: "Ceviche Mixto", descripcion: "", precio: "S/. 30.00", imagen: "/ceviche_mixto.webp" },
      { nombre: "Ceviche Carretillero", descripcion: "", precio: "S/. 30.00", imagen: "/ceviche_carretillero.webp" },
      { nombre: "Ceviche de Conchas Negras", descripcion: "", precio: "S/. 40.00", imagen: "/ceviche_conchas_negras.webp" },
      { nombre: "Leche de Tigre Simple", descripcion: "", precio: "S/. 15.00", imagen: "/leche_tigre_simple.webp" },
      { nombre: "Leche de Tigre Mega Especial", descripcion: "", precio: "S/. 20.00", imagen: "/leche_tigre_mega_especial.webp" },
      { nombre: "Leche de Pantera", descripcion: "", precio: "S/. 25.00", imagen: "/leche_pantera.webp" },
      { nombre: "Papa Huancaína + Ceviche", descripcion: "", precio: "S/. 10.00", imagen: "/papa_huancaina_ceviche.webp" },
      { nombre: "Papa Rellena + Ceviche", descripcion: "", precio: "S/. 10.00", imagen: "/papa_rellena_ceviche.webp" },
      { nombre: "Tortilla de Choclo + Ceviche", descripcion: "", precio: "S/. 15.00", imagen: "/tortilla_choclo_ceviche.webp" },
      { nombre: "Causa Acevichada", descripcion: "", precio: "S/. 20.00", imagen: "/causa_acevichada.webp" },
      { nombre: "Causa Montada", descripcion: "", precio: "S/. 25.00", imagen: "/causa_montada.webp" },
      { nombre: "Causa con Lomo Saltado", descripcion: "Causa rellena acompañada de un jugoso lomo saltado", precio: "S/. 25.00", imagen: "/causa_lomo_saltado.webp" },
      { nombre: "Canastitas Mixtas/Ceviche y Cecina", descripcion: "", precio: "S/. 25.00", imagen: "/canastitas_mixtas.webp" }
    ]
  },
  {
    id: "pastas-y-saltados",
    nombre: "Pastas y Saltados",
    items: [
      { nombre: "Fetuccini con Lomo Saltado", descripcion: "Deliciosos fetuccinis a la crema con lomo saltado tradicional", precio: "S/. 32.00", imagen: "/fetuccini_lomo_saltado.webp" },
      { nombre: "Lomo Saltado", descripcion: "Finos cortes de carne salteados al wok con cebolla, tomate y papas fritas", precio: "S/. 28.00", imagen: "/lomo_saltado.webp" }
    ]
  },
  {
    id: "combos",
    nombre: "Combos",
    items: [
      { nombre: "Combo Caleta", descripcion: "Ceviche + Arroz con Marisco + Chicharrón de Pescado", precio: "S/. 35.00", imagen: "/combo_caleta.webp" },
      { nombre: "Dúos Marinos", descripcion: "Elige tu Combinación", precio: "S/. 30.00", imagen: "/duos_marinos.webp" },
      { nombre: "Ronda Marina", descripcion: "Ceviche Mixto + Arroz con Marisco + Chicharrón de Pescado + Tortilla de Choclo + Causa", precio: "S/. 60.00", imagen: "/ronda_marina.webp" },
      { nombre: "Dúo Amazónico", descripcion: "Ceviche + Cecina + Chorizo + Patacones", precio: "S/. 30.00", imagen: "/duo_amazonico.webp" }
    ]
  },
  {
    id: "arroces",
    nombre: "Arroces",
    items: [
      { nombre: "Arroz con Marisco", descripcion: "", precio: "S/. 25.00", imagen: "/arroz_marisco.webp" },
      { nombre: "Arroz con Langostino", descripcion: "", precio: "S/. 40.00", imagen: "/arroz_langostino.webp" },
      { nombre: "Chaufa de Mariscos", descripcion: "", precio: "S/. 25.00", imagen: "/chaufa_mariscos.webp" },
      { nombre: "Chaufa Regional", descripcion: "", precio: "S/. 25.00", imagen: "/chaufa_regional.webp" }
    ]
  },
  {
    id: "chicharrones",
    nombre: "Chicharrones",
    items: [
      { nombre: "Chicharrón de Pescado", descripcion: "", precio: "S/. 30.00", imagen: "/chicharron_pescado.webp" },
      { nombre: "Chicharrón Mixto", descripcion: "", precio: "S/. 40.00", imagen: "/chicharron_mixto.webp" },
      { nombre: "Chicharrón de Pota", descripcion: "", precio: "S/. 25.00", imagen: "/chicharron_pota.webp" },
      { nombre: "Chicharrón de Pollo", descripcion: "", precio: "S/. 20.00", imagen: "/chicharron_pollo.webp" }
    ]
  },
  {
    id: "frituras",
    nombre: "Frituras",
    items: [
      { nombre: "Cabrilla Frita", descripcion: "", precio: "S/. 35.00", imagen: "/cabrilla_frita.webp" },
      { nombre: "Jalea Simple", descripcion: "", precio: "S/. 30.00", imagen: "/jalea_simple.webp" },
      { nombre: "Jalea Mixta", descripcion: "", precio: "S/. 35.00", imagen: "/jalea_mixta.webp" }
    ]
  },
  {
    id: "sopas",
    nombre: "Sopas",
    items: [
      { nombre: "Sudado", descripcion: "", precio: "S/. 30.00", imagen: "/sudado.webp" },
      { nombre: "Parihuela", descripcion: "", precio: "S/. 40.00", imagen: "/parihuela.webp" },
      { nombre: "Chupe de Pescado", descripcion: "", precio: "S/. 30.00", imagen: "/chupe_pescado.webp" },
      { nombre: "Chupe Mixto", descripcion: "", precio: "S/. 35.00", imagen: "/chupe_mixto.webp" }
    ]
  },
  {
    id: "sabados-y-domingos",
    nombre: "Sábados y Domingos",
    items: [
      { nombre: "Cuy Frito con Papas Guisadas", descripcion: "", precio: "S/. 25.00", imagen: "/cuy_frito.webp" },
      { nombre: "Carne Seca con ...", descripcion: "NO DISPONIBLE", precio: "No disponible", imagen: "", disponible: false },
      { nombre: "Pato Guisado", descripcion: "", precio: "S/. 20.00", imagen: "/pato_guisado.webp" },
      { nombre: "Arroz con Pato", descripcion: "", precio: "S/. 20.00", imagen: "/arroz_con_pato.webp" }
    ]
  },
  {
    id: "bebidas",
    nombre: "Bebidas",
    items: [
      { nombre: "Refresco de chicha o maracuyá", descripcion: "1 litro", precio: "S/. 15.00", imagen: "/bebidas/chicha_jarra.webp", isDrink: true, disponible: true, opciones: ["Chicha Morada", "Maracuyá"] },
      { nombre: "Refresco de chicha o maracuyá", descripcion: "1/2 litro", precio: "S/. 8.00", imagen: "/bebidas/chicha_jarra.webp", isDrink: true, disponible: true, opciones: ["Chicha Morada", "Maracuyá"] },
      { nombre: "Chicha morada frozen", descripcion: "NO DISPONIBLE", precio: "No disponible", imagen: "", isDrink: true, disponible: false },
      { nombre: "Maracuyá frozen", descripcion: "NO DISPONIBLE", precio: "No disponible", imagen: "", isDrink: true, disponible: false },
      { nombre: "Limonada frozen", descripcion: "NO DISPONIBLE", precio: "No disponible", imagen: "", isDrink: true, disponible: false },
      { nombre: "Gaseosa", descripcion: "3 litros", precio: "S/. 18.00", imagen: "/bebidas/gaseosa_3l.webp", isDrink: true, disponible: true, opciones: ["Inka Kola", "Coca Cola"] },
      { nombre: "Gaseosa", descripcion: "1 litro", precio: "S/. 10.00", imagen: "/bebidas/gaseosa_1l.webp", isDrink: true, disponible: true, opciones: ["Inka Kola", "Coca Cola"] },
      { nombre: "Gaseosa gordita", descripcion: "", precio: "S/. 6.00", imagen: "/bebidas/gaseosa_gordita.webp", isDrink: true, disponible: true },
      { nombre: "Gaseosa", descripcion: "1/2 litro", precio: "S/. 5.00", imagen: "/bebidas/gaseosa_medio_litro.webp", isDrink: true, disponible: true, opciones: ["Inka Kola", "Coca Cola"] },
      { nombre: "Agua mineral", descripcion: "", precio: "S/. 4.00", imagen: "/agua_mineral.webp", isDrink: true, disponible: true },
      { nombre: "Cerveza Corona", descripcion: "", precio: "S/. 8.00", imagen: "/bebidas/cerveza_corona.webp", isDrink: true, disponible: true },
      { nombre: "Cerveza Cristal", descripcion: "", precio: "S/. 10.00", imagen: "/bebidas/cerveza_cristal.webp", isDrink: true, disponible: true },
      { nombre: "Cerveza negra", descripcion: "", precio: "S/. 12.00", imagen: "/bebidas/cerveza_negra.webp", isDrink: true, disponible: true },
      { nombre: "Cerveza de trigo", descripcion: "", precio: "S/. 12.00", imagen: "/bebidas/cerveza_trigo.webp", isDrink: true, disponible: true }
    ]
  }
];
