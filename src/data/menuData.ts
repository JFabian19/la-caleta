export interface Dish {
  nombre: string;
  descripcion?: string;
  imagen?: string;
  precio: string;
  isDrink?: boolean;
  disponible?: boolean;
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
      { nombre: "Ceviche de Toyo", descripcion: "", precio: "S/. 25.00", imagen: "/ceviche_toyo.png" },
      { nombre: "Ceviche Mixto", descripcion: "", precio: "S/. 30.00", imagen: "/ceviche_mixto.png" },
      { nombre: "Ceviche Carretillero", descripcion: "", precio: "S/. 30.00", imagen: "/ceviche_carretillero.png" },
      { nombre: "Ceviche de Conchas Negras", descripcion: "", precio: "S/. 40.00", imagen: "/ceviche_conchas_negras.png" },
      { nombre: "Leche de Tigre Simple", descripcion: "", precio: "S/. 15.00", imagen: "/leche_tigre_simple.png" },
      { nombre: "Leche de Tigre Mega Especial", descripcion: "", precio: "S/. 20.00", imagen: "/leche_tigre_mega_especial.png" },
      { nombre: "Leche de Pantera", descripcion: "", precio: "S/. 25.00", imagen: "/leche_pantera.png" },
      { nombre: "Papa Huancaína + Ceviche", descripcion: "", precio: "S/. 10.00", imagen: "/papa_huancaina_ceviche.png" },
      { nombre: "Papa Rellena + Ceviche", descripcion: "", precio: "S/. 10.00", imagen: "/papa_rellena_ceviche.png" },
      { nombre: "Tortilla de Choclo + Ceviche", descripcion: "", precio: "S/. 15.00", imagen: "/tortilla_choclo_ceviche.png" },
      { nombre: "Causa Acevichada", descripcion: "", precio: "S/. 20.00", imagen: "/causa_acevichada.png" },
      { nombre: "Causa Montada", descripcion: "", precio: "S/. 25.00", imagen: "/causa_montada.png" },
      { nombre: "Causa con Lomo Saltado", descripcion: "Causa rellena acompañada de un jugoso lomo saltado", precio: "S/. 25.00", imagen: "/causa_lomo_saltado.png" },
      { nombre: "Canastitas Mixtas/Ceviche y Cecina", descripcion: "", precio: "S/. 25.00", imagen: "/canastitas_mixtas.png" }
    ]
  },
  {
    id: "pastas-y-saltados",
    nombre: "Pastas y Saltados",
    items: [
      { nombre: "Fetuccini con Lomo Saltado", descripcion: "Deliciosos fetuccinis a la crema con lomo saltado tradicional", precio: "S/. 32.00", imagen: "/fetuccini_lomo_saltado.png" },
      { nombre: "Lomo Saltado", descripcion: "Finos cortes de carne salteados al wok con cebolla, tomate y papas fritas", precio: "S/. 28.00", imagen: "/lomo_saltado.png" }
    ]
  },
  {
    id: "combos",
    nombre: "Combos",
    items: [
      { nombre: "Combo Caleta", descripcion: "Ceviche + Arroz con Marisco + Chicharrón de Pescado", precio: "S/. 35.00", imagen: "/combo_caleta.png" },
      { nombre: "Dúos Marinos", descripcion: "Elige tu Combinación", precio: "S/. 30.00", imagen: "/duos_marinos.png" },
      { nombre: "Ronda Marina", descripcion: "Ceviche Mixto + Arroz con Marisco + Chicharrón de Pescado + Tortilla de Choclo + Causa", precio: "S/. 60.00", imagen: "/ronda_marina.png" },
      { nombre: "Dúo Amazónico", descripcion: "Ceviche + Cecina + Chorizo + Patacones", precio: "S/. 30.00", imagen: "/duo_amazonico.png" }
    ]
  },
  {
    id: "arroces",
    nombre: "Arroces",
    items: [
      { nombre: "Arroz con Marisco", descripcion: "", precio: "S/. 25.00", imagen: "/arroz_marisco.png" },
      { nombre: "Arroz con Langostino", descripcion: "", precio: "S/. 40.00", imagen: "/arroz_langostino.png" },
      { nombre: "Chaufa de Mariscos", descripcion: "", precio: "S/. 25.00", imagen: "/chaufa_mariscos.png" },
      { nombre: "Chaufa Regional", descripcion: "", precio: "S/. 25.00", imagen: "/chaufa_regional.png" }
    ]
  },
  {
    id: "chicharrones",
    nombre: "Chicharrones",
    items: [
      { nombre: "Chicharrón de Pescado", descripcion: "", precio: "S/. 30.00", imagen: "/chicharron_pescado.png" },
      { nombre: "Chicharrón Mixto", descripcion: "", precio: "S/. 40.00", imagen: "/chicharron_mixto.png" },
      { nombre: "Chicharrón de Pota", descripcion: "", precio: "S/. 25.00", imagen: "/chicharron_pota.png" },
      { nombre: "Chicharrón de Pollo", descripcion: "", precio: "S/. 20.00", imagen: "/chicharron_pollo.png" }
    ]
  },
  {
    id: "frituras",
    nombre: "Frituras",
    items: [
      { nombre: "Cabrilla Frita", descripcion: "", precio: "S/. 35.00", imagen: "/cabrilla_frita.png" },
      { nombre: "Jalea Simple", descripcion: "", precio: "S/. 30.00", imagen: "/jalea_simple.png" },
      { nombre: "Jalea Mixta", descripcion: "", precio: "S/. 35.00", imagen: "/jalea_mixta.png" }
    ]
  },
  {
    id: "sopas",
    nombre: "Sopas",
    items: [
      { nombre: "Sudado", descripcion: "", precio: "S/. 30.00", imagen: "/sudado.png" },
      { nombre: "Parihuela", descripcion: "", precio: "S/. 40.00", imagen: "/parihuela.png" },
      { nombre: "Chupe de Pescado", descripcion: "", precio: "S/. 30.00", imagen: "/chupe_pescado.png" },
      { nombre: "Chupe Mixto", descripcion: "", precio: "S/. 35.00", imagen: "/chupe_mixto.png" }
    ]
  },
  {
    id: "sabados-y-domingos",
    nombre: "Sábados y Domingos",
    items: [
      { nombre: "Cuy Frito con Papas Guisadas", descripcion: "", precio: "S/. 25.00", imagen: "/cuy_frito.png" },
      { nombre: "Carne Seca con ...", descripcion: "NO DISPONIBLE", precio: "No disponible", imagen: "", disponible: false },
      { nombre: "Pato Guisado", descripcion: "", precio: "S/. 20.00", imagen: "/pato_guisado.png" },
      { nombre: "Arroz con Pato", descripcion: "", precio: "S/. 20.00", imagen: "/arroz_con_pato.png" }
    ]
  },
  {
    id: "bebidas",
    nombre: "Bebidas",
    items: [
      { nombre: "Refresco de chicha o maracuyá", descripcion: "1 litro", precio: "S/. 15.00", imagen: "/bebidas/chicha_jarra.png", isDrink: true, disponible: true },
      { nombre: "Refresco de chicha o maracuyá", descripcion: "1/2 litro", precio: "S/. 8.00", imagen: "/bebidas/chicha_jarra.png", isDrink: true, disponible: true },
      { nombre: "Chicha morada frozen", descripcion: "NO DISPONIBLE", precio: "No disponible", imagen: "", isDrink: true, disponible: false },
      { nombre: "Maracuyá frozen", descripcion: "NO DISPONIBLE", precio: "No disponible", imagen: "", isDrink: true, disponible: false },
      { nombre: "Limonada frozen", descripcion: "NO DISPONIBLE", precio: "No disponible", imagen: "", isDrink: true, disponible: false },
      { nombre: "Gaseosa", descripcion: "3 litros", precio: "S/. 18.00", imagen: "/bebidas/gaseosa_3l.png", isDrink: true, disponible: true },
      { nombre: "Gaseosa", descripcion: "1/2 litro", precio: "S/. 10.00", imagen: "/bebidas/gaseosa_1l.png", isDrink: true, disponible: true },
      { nombre: "Gaseosa gordita", descripcion: "", precio: "S/. 6.00", imagen: "/bebidas/gaseosa_gordita.png", isDrink: true, disponible: true },
      { nombre: "Gaseosa", descripcion: "1/2 litro", precio: "S/. 5.00", imagen: "/bebidas/gaseosa_medio_litro.png", isDrink: true, disponible: true },
      { nombre: "Agua mineral", descripcion: "", precio: "S/. 4.00", imagen: "/agua_mineral.png", isDrink: true, disponible: true },
      { nombre: "Cerveza Corona", descripcion: "", precio: "S/. 8.00", imagen: "/bebidas/cerveza_corona.png", isDrink: true, disponible: true },
      { nombre: "Cerveza Cristal", descripcion: "", precio: "S/. 10.00", imagen: "/bebidas/cerveza_cristal.png", isDrink: true, disponible: true },
      { nombre: "Cerveza negra", descripcion: "", precio: "S/. 12.00", imagen: "/bebidas/cerveza_negra.png", isDrink: true, disponible: true },
      { nombre: "Cerveza de trigo", descripcion: "", precio: "S/. 12.00", imagen: "/bebidas/cerveza_trigo.png", isDrink: true, disponible: true }
    ]
  }
];
