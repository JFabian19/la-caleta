import Papa from 'papaparse';

// Coloca aquí tu ID de Google Sheets (lo encuentras en la URL de tu hoja de cálculo)
export const SHEET_ID = '1VfEAK3xsLajmQArPJeH-6arq_ha3djKZIM587o0s70k';

export interface SheetDish {
  categoría: string;
  'nombre del plato': string;
  descripción: string;
  precio: string;
  'URL de imagen': string;
  disponible?: string;
}

export interface SheetCategory {
  nombre: string;
}

export interface SheetReview {
  timestamp: string;
  estrellasMozo: number;
  estrellasComida: number;
  comentario: string;
}

export interface SheetLoyalty {
  timestamp: string;
  nombre: string;
  telefono: string;
  fechaNacimiento: string;
  distrito: string;
  correo: string;
}

export const fetchSheetData = async <T>(sheetName: string): Promise<T[]> => {
  if (!SHEET_ID) return [];

  // Mapeo de alternativas de nombres de pestañas (con o sin tilde)
  const nameVariants: Record<string, string[]> = {
    'Categorías': ['Categorías', 'Categorias', 'categorias', 'categorías'],
    'Platos': ['Platos', 'platos'],
    'Reseñas': ['Reseñas', 'Resenas', 'reseñas', 'resenas'],
    'Fidelización': ['Fidelización', 'Fidelizacion', 'fidelización', 'fidelizacion', 'Cumpleaños', 'Cumpleanos']
  };

  const variants = nameVariants[sheetName] || [sheetName];

  for (const variant of variants) {
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(variant)}`;
    try {
      const response = await fetch(url);
      if (!response.ok) continue;
      
      const csvText = await response.text();
      // Si la pestaña no existe, Google Sheets retorna HTML o respuesta de error
      if (csvText.includes('<!DOCTYPE html>') || csvText.includes('google-visualization-errors')) {
        continue;
      }

      const parsed = await new Promise<T[]>((resolve, reject) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => resolve(results.data as T[]),
          error: (error: any) => reject(error),
        });
      });

      if (parsed && parsed.length > 0) {
        return parsed;
      }
    } catch (error) {
      console.warn(`Intento de carga para pestaña ${variant} no exitoso:`, error);
    }
  }

  return [];
};

// Configura aquí la URL de tu Google Apps Script Web App para poder enviar datos
export const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbztWIlPPU48pzGo9jY52izMTDTDo-pCZTtikF1bWJjzqBUHfnrWJXTwoAPfOuAHbOE/exec';

export const submitSheetData = async (sheetName: string, data: any): Promise<boolean> => {
  if (!WEB_APP_URL) {
    console.warn('Falta configurar WEB_APP_URL. Simulando envío a:', sheetName, data);
    return new Promise(resolve => setTimeout(() => resolve(true), 1000));
  }

  try {
    const response = await fetch(WEB_APP_URL, {
      method: 'POST',
      mode: 'no-cors', // Importante para evitar problemas de CORS con Apps Script
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify({
        sheetName,
        data,
      }),
    });
    
    return true;
  } catch (error) {
    console.error(`Error submitting to sheet ${sheetName}:`, error);
    return false;
  }
};

