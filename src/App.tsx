import React, { useState, useMemo, useEffect } from 'react';
import { ShoppingBag, Plus, Minus, ChevronRight, X, Trash2, Utensils, Facebook, MapPin, Loader2, Gift, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { fetchSheetData, submitSheetData, SheetDish, SheetCategory, SHEET_ID } from './services/googleSheets';
import { DEFAULT_MENU_DATA } from './data/menuData';

// ==========================================
// 📋 CONFIGURACIÓN DE LA PLANTILLA DEL MENÚ
// ==========================================
const RESTAURANTE_NAME = "La Caleta Restaurant Marisquería";
const RESTAURANTE_SLOGAN = "El mejor sabor del mar y la selva";
const WHATSAPP_NUMBER = "51988132003"; // Número de WhatsApp para recibir los pedidos
const FACEBOOK_URL = "https://www.facebook.com/Caletamarisqueria";
const MAPS_URL = "https://maps.app.goo.gl/pad21wxLXwTA8Ygc7";
const LOGO_FOOTER_PATH = "/header_logo.webp";
const BANNER_PATH = "/banner.webp";
const MARQUEE_TEXT = "🌊 EL VERDADERO SABOR DEL MAR A TU MESA • CEVICHES, RONDAS Y FUSIÓN AMAZÓNICA • ¡HAZ TU PEDIDO CALETA YA! 🦐🍋 • ";
const COPY_BOTON_CUMPLEANOS = "¡Celebra a lo grande! 🥳 Registra tu cumpleaños aquí y recibe una cortesía marina para festejar tu día. 🦀🎁";
// ==========================================

// Mapa de imágenes locales por defecto para platos conocidos (vacío por defecto para la plantilla)
const LOCAL_IMAGES: Record<string, string> = {
  "Ceviche de Toyo": "/ceviche_toyo.webp",
  "Ceviche de Caballa": "/ceviche_caballa.webp",
  "Ceviche de Palabritas": "/ceviche_palabritas.webp",
  "Ceviche langostino": "/ceviche_langostino.webp",
  "Ceviche Mixto": "/ceviche_mixto.webp",
  "Ceviche Carretillero": "/ceviche_carretillero.webp",
  "Ceviche de Conchas Negras": "/ceviche_conchas_negras.webp",
  "Leche de Tigre Simple": "/leche_tigre_simple.webp",
  "Leche de Tigre Mega Especial": "/leche_tigre_mega_especial.webp",
  "Leche de Pantera": "/leche_pantera.webp",
  "Papa Huancaína + Ceviche": "/papa_huancaina_ceviche.webp",
  "Papa Rellena + Ceviche": "/papa_rellena_ceviche.webp",
  "Tortilla de Choclo + Ceviche": "/tortilla_choclo_ceviche.webp",
  "Causa Acevichada": "/causa_acevichada.webp",
  "Causa Montada": "/causa_montada.webp",
  "Causa con Lomo Saltado": "/causa_lomo_saltado.webp",
  "Canastitas Mixtas/Ceviche y Cecina": "/canastitas_mixtas.webp",
  "Fetuccini con Lomo Saltado": "/fetuccini_lomo_saltado.webp",
  "Lomo Saltado": "/lomo_saltado.webp",
  "Combo Caleta": "/combo_caleta.webp",
  "Dúos Marinos": "/duos_marinos.webp",
  "Ronda Marina": "/ronda_marina.webp",
  "Dúo Amazónico": "/duo_amazonico.webp",
  "Arroz con Marisco": "/arroz_marisco.webp",
  "Arroz con Langostino": "/arroz_langostino.webp",
  "Chaufa de Mariscos": "/chaufa_mariscos.webp",
  "Chaufa Regional": "/chaufa_regional.webp",
  "Tacu tacu con salsa mariscos": "/tacu_tacu_salsa_mariscos.webp",
  "Tacu tacu con lomo saltado": "/tacu_tacu_lomo_saltado.webp",
  "Chicha de jora": "/bebidas/chicha_jora.webp",
  "Chicharrón de Pescado": "/chicharron_pescado.webp",
  "Chicharrón Mixto": "/chicharron_mixto.webp",
  "Chicharrón de Pota": "/chicharron_pota.webp",
  "Chicharrón de Pollo": "/chicharron_pollo.webp",
  "Cabrilla Frita": "/cabrilla_frita.webp",
  "Jalea Simple": "/jalea_simple.webp",
  "Jalea Mixta": "/jalea_mixta.webp",
  "Sudado": "/sudado.webp",
  "Parihuela": "/parihuela.webp",
  "Chupe de Pescado": "/chupe_pescado.webp",
  "Chupe Mixto": "/chupe_mixto.webp",
  "Cuy Frito con Papas Guisadas": "/cuy_frito.webp",
  "Pato Guisado": "/pato_guisado.webp",
  "Arroz con Pato": "/arroz_con_pato.webp",
  "Agua mineral": "/agua_mineral.webp",
};

interface Dish {
  nombre: string;
  descripcion?: string;
  imagen?: string;
  precio: string;
  isDrink?: boolean;
  disponible?: boolean;
  opciones?: string[];
}

interface Category {
  id: string;
  nombre: string;
  items: Dish[];
}

interface CartItem {
  nombre: string;
  precio: string;
  cantidad: number;
  isDrink?: boolean;
}

export default function App() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showSummary, setShowSummary] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedDishForOptions, setSelectedDishForOptions] = useState<{ dish: Dish; categoryIsDrink?: boolean } | null>(null);
  const [selectedOption, setSelectedOption] = useState<string>('Inka Kola');
  const [selectedSize, setSelectedSize] = useState<string>('1/2 Litro');

  // States for Birthday Form
  const [showBirthdayForm, setShowBirthdayForm] = useState(false);
  const [isSubmittingBirthday, setIsSubmittingBirthday] = useState(false);
  const [birthdaySuccess, setBirthdaySuccess] = useState(false);
  const [birthdayData, setBirthdayData] = useState({
    nombre: '',
    telefono: '',
    fechaNacimiento: '',
    distrito: '',
    correo: ''
  });

  // States for Review Form
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [reviewData, setReviewData] = useState({
    estrellasMozo: 0,
    estrellasComida: 0,
    comentario: ''
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        if (!SHEET_ID) {
          setCategories(DEFAULT_MENU_DATA);
          if (DEFAULT_MENU_DATA.length > 0) {
            setActiveCategory(DEFAULT_MENU_DATA[0].id);
          }
          return;
        }

        const [cats, dishes] = await Promise.all([
          fetchSheetData<SheetCategory>('Categorías'),
          fetchSheetData<SheetDish>('Platos')
        ]);

        if (cats.length === 0 && dishes.length === 0) {
          setCategories(DEFAULT_MENU_DATA);
          if (DEFAULT_MENU_DATA.length > 0) {
            setActiveCategory(DEFAULT_MENU_DATA[0].id);
          }
          return;
        }

        const normalizeStr = (str: string) => str.toLowerCase().replace(/\s+/g, ' ').trim();
        const getCategoryName = (c: any) => (c['nombre'] || c['Nombre'] || c['categoría'] || c['categoria'] || c['Categoría'] || c['Categoria'] || '').toString().trim();
        const getDishCategory = (d: any) => (d['categoría'] || d['categoria'] || d['Categoría'] || d['Categoria'] || '').toString().trim();
        const getDishName = (d: any) => (d['nombre del plato'] || d['nombre'] || d['plato'] || d['Nombre del plato'] || d['Nombre'] || '').toString().replace(/\s+/g, ' ').trim();
        const getDishDescription = (d: any) => (d['descripción'] || d['descripcion'] || d['Descripción'] || d['Descripcion'] || '').toString().replace(/\s+/g, ' ').trim();
        const getDishPrice = (d: any) => (d['precio'] || d['Precio'] || '').toString().trim();
        const getDishImageUrl = (d: any) => {
          const raw = d['URL de imagen'] || d['url de imagen'] || d['URL de Imagen'] || d['Url de imagen'] || d['imagen'] || d['imagen_url'] || d['url_imagen'] || d['image'] || d['Image'] || '';
          return typeof raw === 'string' ? raw.trim() : '';
        };

        const validCats = cats.map(c => getCategoryName(c)).filter(Boolean);

        const formattedCategories: Category[] = validCats.map(catName => {
          const defaultCat = DEFAULT_MENU_DATA.find(dc => normalizeStr(dc.nombre) === normalizeStr(catName) || dc.id === normalizeStr(catName).replace(/\s+/g, '-'));
          
          const sheetItems = dishes
            .filter(d => normalizeStr(getDishCategory(d)) === normalizeStr(catName))
            .map(d => {
              const dishName = getDishName(d);
              const dishDesc = getDishDescription(d);
              const dishPrice = getDishPrice(d);
              const customImgUrl = getDishImageUrl(d);

              const defaultDish = defaultCat?.items.find(di => normalizeStr(di.nombre) === normalizeStr(dishName));
              const isGaseosa = dishName.toLowerCase().includes('gaseosa') && (dishDesc.includes('3') || dishDesc.includes('1') || dishDesc.includes('1/2'));
              const isRefresco = dishName.toLowerCase().includes('refresco') && (dishDesc.includes('1') || dishDesc.includes('1/2'));
              
              // Prioridad: URL de imagen definida en Google Sheets -> Imagen local por defecto -> Nulo
              const finalImage = customImgUrl ? customImgUrl : (LOCAL_IMAGES[dishName] || defaultDish?.imagen || undefined);

              return {
                nombre: dishName,
                descripcion: dishDesc,
                precio: dishPrice,
                imagen: finalImage,
                isDrink: catName.toLowerCase().includes('bebida'),
                opciones: defaultDish?.opciones || (isGaseosa ? ["Inka Kola", "Coca Cola"] : isRefresco ? ["Chicha Morada", "Maracuyá"] : undefined)
              };
            });

          const existingKeys = new Set(sheetItems.map(i => normalizeStr(i.nombre) + (i.descripcion ? `_${normalizeStr(i.descripcion)}` : '')));
          const extraItems = (defaultCat?.items || []).filter(item => !existingKeys.has(normalizeStr(item.nombre) + (item.descripcion ? `_${normalizeStr(item.descripcion)}` : '')));

          return {
            id: catName.toLowerCase().replace(/\s+/g, '-'),
            nombre: catName,
            items: [...sheetItems, ...extraItems]
          };
        });

        // Incluir categorías por defecto que no estén en el Sheet
        DEFAULT_MENU_DATA.forEach(dc => {
          if (!formattedCategories.some(fc => fc.nombre.toLowerCase() === dc.nombre.toLowerCase())) {
            formattedCategories.push(dc);
          }
        });

        setCategories(formattedCategories);
        if (formattedCategories.length > 0) {
          setActiveCategory(formattedCategories[0].id);
        }
      } catch (error) {
        console.error("Error loading data:", error);
        setCategories(DEFAULT_MENU_DATA);
        if (DEFAULT_MENU_DATA.length > 0) {
          setActiveCategory(DEFAULT_MENU_DATA[0].id);
        }
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const cartCount = useMemo(() => cart.reduce((acc, item) => acc + item.cantidad, 0), [cart]);

  const addToCart = (dish: Dish, categoryIsDrink?: boolean) => {
    const isDrink = categoryIsDrink || dish.isDrink || false;
    const isDishWithOptions =
      (dish.opciones && dish.opciones.length > 0) ||
      (dish.nombre.toLowerCase().includes('gaseosa') &&
        dish.descripcion &&
        (dish.descripcion.includes('3') || dish.descripcion.includes('1') || dish.descripcion.includes('1/2'))) ||
      dish.nombre.toLowerCase().includes('refresco');

    if (isDishWithOptions) {
      const defaultOpts = dish.nombre.toLowerCase().includes('refresco') ? ['Chicha Morada', 'Maracuyá'] : ['Inka Kola', 'Coca Cola'];
      const opts = dish.opciones && dish.opciones.length > 0 ? dish.opciones : defaultOpts;
      setSelectedDishForOptions({ dish: { ...dish, opciones: opts }, categoryIsDrink });
      setSelectedOption(opts[0]);
      setSelectedSize('1/2 Litro');
      return;
    }

    const itemDisplayName = dish.nombre === 'Gaseosa' && dish.descripcion ? `${dish.nombre} ${dish.descripcion}` : dish.nombre;

    setCart(prev => {
      const existing = prev.find(i => i.nombre === itemDisplayName && i.precio === dish.precio);
      if (existing) {
        return prev.map(i =>
          (i.nombre === itemDisplayName && i.precio === dish.precio)
            ? { ...i, cantidad: i.cantidad + 1 }
            : i
        );
      }
      return [...prev, { nombre: itemDisplayName, precio: dish.precio, cantidad: 1, isDrink }];
    });
  };

  const confirmAddToCartWithOptions = () => {
    if (!selectedDishForOptions) return;
    const { dish, categoryIsDrink } = selectedDishForOptions;
    const isDrink = categoryIsDrink || dish.isDrink || false;
    const isRefresco = dish.nombre.toLowerCase().includes('refresco');

    let itemDisplayName = `${dish.nombre}${dish.descripcion ? ` ${dish.descripcion}` : ''} - ${selectedOption}`;
    let finalPrice = dish.precio;

    if (isRefresco) {
      itemDisplayName = `Refresco de ${selectedOption} (${selectedSize})`;
      finalPrice = selectedSize === '1 Litro' ? 'S/. 15.00' : 'S/. 8.00';
    }

    setCart(prev => {
      const existing = prev.find(i => i.nombre === itemDisplayName && i.precio === finalPrice);
      if (existing) {
        return prev.map(i =>
          (i.nombre === itemDisplayName && i.precio === finalPrice)
            ? { ...i, cantidad: i.cantidad + 1 }
            : i
        );
      }
      return [...prev, { nombre: itemDisplayName, precio: finalPrice, cantidad: 1, isDrink }];
    });

    setSelectedDishForOptions(null);
  };

  const updateQuantity = (nombre: string, precio: string, delta: number) => {
    setCart(prev =>
      prev
        .map(i => {
          if (i.nombre === nombre && i.precio === precio) {
            const newQty = i.cantidad + delta;
            return newQty > 0 ? { ...i, cantidad: newQty } : null;
          }
          return i;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const parsePrice = (priceStr: string | number): number => {
    if (typeof priceStr === 'number') return priceStr;
    if (!priceStr) return 0;
    // Replace commas with dots, remove everything that is not a digit or dot
    // If string is "S/. 25.00", removing 'S' and '/' and ' ' gives '. 25.00' or '25.00'
    // Clean all non-digit and non-dot characters except when forming a valid float
    const cleanStr = String(priceStr).replace(/,/g, '.');
    const matches = cleanStr.match(/\d+(\.\d+)?/);
    if (matches) {
      return parseFloat(matches[0]) || 0;
    }
    return 0;
  };

  const calculateSubtotal = () => {
    return cart.reduce((acc, item) => {
      return acc + parsePrice(item.precio) * item.cantidad;
    }, 0);
  };

  const calculateDishesCount = () => {
    return cart.reduce((acc, item) => item.isDrink ? acc : acc + item.cantidad, 0);
  };

  const calculateEnvaseFee = () => {
    return calculateDishesCount() * 1.00;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateEnvaseFee();
  };

  const sendToWhatsApp = () => {
    const subtotal = calculateSubtotal();
    const dishesCount = calculateDishesCount();
    const envaseFee = calculateEnvaseFee();
    const total = calculateTotal();

    let message = `*Hola ${RESTAURANTE_NAME}, deseo realizar un pedido:*\n\n`;
    cart.forEach(item => {
      message += `• ${item.cantidad} x ${item.nombre} (${item.precio})\n`;
    });
    
    if (envaseFee > 0) {
      message += `\n📦 *Costo de envase (${dishesCount} plato${dishesCount > 1 ? 's' : ''}):* S/.${envaseFee.toFixed(2)}`;
    }

    message += `\n*TOTAL A PAGAR: S/.${total.toFixed(2)}*`;
    message += `\n\n📌 *Nota de envío:* Si la dirección es cercana a nuestro local, el envío es GRATIS. Si la dirección es alejada, se aplicará un costo de envío adicional.`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const scrollToCategory = (catId: string) => {
    setActiveCategory(catId);
    const el = document.getElementById(`cat-${catId}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleBirthdaySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingBirthday(true);
    const success = await submitSheetData('Fidelización', {
      timestamp: new Date().toLocaleString('es-PE'),
      nombre: birthdayData.nombre,
      telefono: birthdayData.telefono,
      fechaNacimiento: birthdayData.fechaNacimiento,
      distrito: birthdayData.distrito,
      correo: birthdayData.correo || 'No indicado'
    });
    
    setIsSubmittingBirthday(false);
    if (success) {
      setBirthdaySuccess(true);
      setTimeout(() => {
        setShowBirthdayForm(false);
        setBirthdaySuccess(false);
        setBirthdayData({ nombre: '', telefono: '', fechaNacimiento: '', distrito: '', correo: '' });
      }, 3000);
    } else {
      alert("Hubo un error al enviar tus datos. Por favor, inténtalo de nuevo.");
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (reviewData.estrellasMozo === 0 || reviewData.estrellasComida === 0) {
      alert("Por favor califica ambas opciones con estrellas.");
      return;
    }

    setIsSubmittingReview(true);
    const success = await submitSheetData('Reseñas', {
      timestamp: new Date().toLocaleString('es-PE'),
      estrellasMozo: reviewData.estrellasMozo,
      estrellasComida: reviewData.estrellasComida,
      comentario: reviewData.comentario || 'Sin comentarios'
    });
    
    setIsSubmittingReview(false);
    if (success) {
      setReviewSuccess(true);
      setTimeout(() => {
        setShowReviewForm(false);
        setReviewSuccess(false);
        setReviewData({ estrellasMozo: 0, estrellasComida: 0, comentario: '' });
      }, 3000);
    } else {
      alert("Hubo un error al enviar tu reseña. Por favor, inténtalo de nuevo.");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <p className="font-slogan text-primary font-bold tracking-widest uppercase text-xs">Cargando delicias...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen relative shadow-2xl overflow-hidden flex flex-col font-sans">
      <header className="sticky top-0 bg-white/95 backdrop-blur-md z-50 px-5 py-3 flex justify-between items-center border-b border-gray-100 shadow-sm">
        <div className="flex items-center gap-3">
          {LOGO_FOOTER_PATH ? (
            <img 
              src={LOGO_FOOTER_PATH} 
              alt={RESTAURANTE_NAME} 
              className="h-14 w-auto object-contain drop-shadow-sm" 
            />
          ) : (
            <div className="flex flex-col items-start">
              <h1 className="font-title text-[28px] text-primary leading-none tracking-wide">{RESTAURANTE_NAME}</h1>
              <span className="font-slogan text-[11px] text-secondary font-bold tracking-wider mt-0.5">{RESTAURANTE_SLOGAN}</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          {FACEBOOK_URL && (
            <motion.a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileTap={{ scale: 0.95 }}
              className="w-11 h-11 bg-primary/10 rounded-full flex items-center justify-center text-primary cursor-pointer"
            >
              <Facebook size={22} />
            </motion.a>
          )}
          {MAPS_URL && (
            <motion.a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileTap={{ scale: 0.95 }}
              className="w-11 h-11 bg-primary/10 rounded-full flex items-center justify-center text-primary cursor-pointer"
            >
              <MapPin size={22} />
            </motion.a>
          )}
          <motion.div
            onClick={() => cartCount > 0 && setShowSummary(true)}
            whileTap={{ scale: 0.95 }}
            className="w-11 h-11 bg-primary/10 rounded-full flex items-center justify-center relative cursor-pointer"
          >
            <ShoppingBag size={22} className="text-primary" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[20px] h-5 bg-secondary text-white rounded-full text-[10px] font-bold flex items-center justify-center px-1">
                {cartCount}
              </span>
            )}
          </motion.div>
        </div>
      </header>

      <div className="w-full bg-primary py-2 overflow-hidden flex items-center">
        <div className="animate-marquee flex gap-6 text-white font-slogan font-bold text-[11px] tracking-widest uppercase whitespace-nowrap">
          {[...Array(10)].map((_, i) => (
            <span key={i}>{MARQUEE_TEXT}</span>
          ))}
        </div>
      </div>

      <div className="px-5 pt-4">
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          animate={{ 
            boxShadow: ["0px 0px 0px 0px rgba(245,158,11,0.6)", "0px 0px 20px 8px rgba(245,158,11,0)", "0px 0px 0px 0px rgba(245,158,11,0)"] 
          }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          onClick={() => setShowBirthdayForm(true)}
          className="w-full bg-gradient-to-r from-secondary via-amber-600 to-primary text-white py-3 px-4 rounded-2xl flex items-center justify-center gap-2 font-bold text-[10px] sm:text-[11px] uppercase tracking-wide border border-yellow-400 relative overflow-hidden group text-center"
        >
          <div className="absolute inset-0 shimmer opacity-30 mix-blend-overlay"></div>
          <Gift size={18} className="animate-bounce shrink-0" />
          <span>{COPY_BOTON_CUMPLEANOS}</span>
        </motion.button>
      </div>

      <div className="px-5 pt-4 pb-3">
        {BANNER_PATH ? (
          <div className="relative w-full rounded-3xl overflow-hidden shadow-xl aspect-[16/9] sm:aspect-[2/1] border border-gray-100">
            <img 
              src={BANNER_PATH} 
              alt={RESTAURANTE_NAME} 
              className="w-full h-full object-cover" 
            />
          </div>
        ) : (
          <div className="relative w-full rounded-3xl overflow-hidden shadow-xl aspect-[2/1] bg-gradient-to-br from-primary/10 to-secondary/15 flex flex-col items-center justify-center text-center p-4 border border-dashed border-primary/20">
            <p className="font-dish font-bold text-primary text-sm uppercase tracking-wider">
              aca va a imagen
            </p>
          </div>
        )}
      </div>

      <div className="px-5 py-3 overflow-x-auto no-scrollbar">
        <div className="flex gap-2 w-max">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => scrollToCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-[11px] font-category font-semibold whitespace-nowrap transition-all duration-200 border
                ${activeCategory === cat.id
                  ? 'bg-primary text-white border-primary shadow-md shadow-primary/20'
                  : 'bg-white text-dark border-gray-200 hover:border-primary/40 hover:text-primary'
                }`}
            >
              {cat.nombre}
            </button>
          ))}
        </div>
      </div>

      <main className="flex-1 overflow-y-auto pb-32 px-5">
        {categories.map(cat => (
          <section key={cat.id} id={`cat-${cat.id}`} className="mb-10 scroll-mt-28">
            <div className="mb-5 pt-2">
              <div className="flex items-center gap-2 mb-1">
                <Utensils className="text-primary wave-icon" size={22} />
                <h3 className="font-category font-semibold text-primary text-[26px] leading-none tracking-wide category-underline">
                  {cat.nombre}
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {cat.items.map((dish, idx) => {
                const isUnavailable = dish.disponible === false || dish.precio?.toLowerCase().includes('no disponible');
                return (
                  <motion.div
                    key={idx}
                    whileHover={isUnavailable ? {} : { y: -4 }}
                    className={`bg-white rounded-[2rem] overflow-hidden flex flex-col shadow-sm border border-gray-100 transition-all duration-200 ${
                      isUnavailable ? 'opacity-60 border-gray-200' : 'hover:border-primary/30 hover:shadow-md'
                    }`}
                  >
                    <div className="bg-primary/5 aspect-square flex items-center justify-center relative overflow-hidden border-b border-gray-100">
                      { (dish.imagen || LOCAL_IMAGES[dish.nombre]) ? (
                        <img 
                          src={dish.imagen || LOCAL_IMAGES[dish.nombre]} 
                          alt={dish.nombre} 
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                          onClick={() => setSelectedImage(dish.imagen || LOCAL_IMAGES[dish.nombre] || null)}
                        />
                      ) : (
                        <span className="font-dish font-bold text-[11px] text-primary uppercase tracking-wider text-center p-4">
                          aca va a imagen
                        </span>
                      )}
                      {isUnavailable && (
                        <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] flex items-center justify-center">
                          <span className="bg-red-500 text-white font-bold text-[10px] uppercase px-2.5 py-1 rounded-full tracking-wider shadow-md">
                            Agotado
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4 flex flex-col flex-1">
                      <h4 className="font-dish font-bold text-dark text-[13px] leading-tight mb-1">
                        {dish.nombre}
                      </h4>
                      {dish.descripcion && (
                        <p className="text-[10px] text-gray-400 leading-tight mb-2 line-clamp-3">
                          {dish.descripcion}
                        </p>
                      )}
                      <div className="flex-1"></div>
                      <div className="flex items-center justify-between mt-2">
                        <span className={`font-dish font-bold text-[15px] whitespace-nowrap ${isUnavailable ? 'text-gray-400 text-xs' : 'text-primary'}`}>
                          {dish.precio}
                        </span>
                        {!isUnavailable && (
                          <motion.button
                            whileTap={{ scale: 0.8 }}
                            onClick={() => addToCart(dish, cat.id === 'bebidas')}
                            className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary transition-colors duration-200 shrink-0"
                          >
                            <Plus size={16} strokeWidth={3} />
                          </motion.button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>
        ))}

        <section className="mt-8 mb-4 border border-gray-100 bg-gray-50 rounded-3xl p-5 text-center shadow-sm">
          <h3 className="font-title text-primary text-[22px] leading-tight mb-2">¿Cómo estuvo todo?</h3>
          <p className="text-[11px] text-gray-500 mb-4 px-4">Ayúdanos a mejorar calificando tu experiencia con nosotros</p>
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowReviewForm(true)}
            className="bg-primary text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-md shadow-primary/20 flex items-center justify-center gap-2 mx-auto w-full"
          >
            <Star size={18} className="fill-white" />
            Reseña nuestra comida
          </motion.button>
        </section>

        {/* 📍 Mapa de Ubicación */}
        <section className="mt-8 pt-6 border-t border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="text-primary" size={22} />
            <h3 className="font-title text-primary text-2xl leading-none">Nuestra Ubicación</h3>
          </div>
          <p className="text-xs text-gray-500 mb-4">
            Restaurant Cevicheria "LA CALETA" • ¡Te esperamos con el mejor sabor marino y selvático!
          </p>
          <div className="w-full h-60 rounded-3xl overflow-hidden shadow-md border border-gray-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.513173716342!2d-76.7304817!3d-7.1821309!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91b06c743444cb8d%3A0x1efd9b7450ad5336!2sRestaurant%20Cevicheria%20%22%20LA%20CALETA%22!5e0!3m2!1ses!2spe!4v1784941102443!5m2!1ses!2spe"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Ubicación La Caleta"
            ></iframe>
          </div>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center justify-center gap-2 w-full bg-primary/10 text-primary py-3 rounded-2xl font-bold text-xs hover:bg-primary/20 transition-colors shadow-sm"
          >
            <MapPin size={18} />
            Ver ubicación en Google Maps
          </a>
        </section>

        <footer className="mt-8 pt-8 pb-10 border-t border-gray-200 flex flex-col items-center justify-center">
          <p className="font-title text-2xl text-primary mb-4">{RESTAURANTE_NAME}</p>
          {LOGO_FOOTER_PATH ? (
            <img src={LOGO_FOOTER_PATH} alt={RESTAURANTE_NAME} className="w-32 h-auto mb-6 object-contain drop-shadow-md" />
          ) : (
            <div className="w-32 h-32 mb-6 rounded-2xl border border-dashed border-primary/30 bg-primary/5 flex items-center justify-center text-center p-2">
              <span className="font-dish font-bold text-[10px] text-primary uppercase tracking-wide">aca va a imagen</span>
            </div>
          )}
          <p className="text-[11px] text-gray-400 font-medium">© 2026 Todos los derechos reservados.</p>
        </footer>

        <div className="bg-dark py-6 flex flex-col items-center justify-center">
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-1 opacity-50 text-white/50">Digital Menu Experience</p>
          <motion.a 
            href="https://tymasolutions.lat/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 font-bold text-sm tracking-tight group cursor-pointer"
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-white group-hover:text-[#00BFFF] transition-colors duration-200">Hecho por Tyma</span>
            <span className="text-[#00BFFF] group-hover:text-white transition-colors duration-200">Solutions</span>
          </motion.a>
        </div>
      </main>

      <AnimatePresence>
        {cartCount > 0 && !showSummary && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 w-full max-w-md p-5 z-40"
          >
            <div className="glass rounded-[2rem] p-4 flex items-center justify-between border border-white/50 shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center relative overflow-hidden">
                  <div className="shimmer absolute inset-0 opacity-20"></div>
                  <ShoppingBag size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Tu Pedido</p>
                  <p className="font-bold text-dark text-lg">{cartCount} Artículos</p>
                </div>
              </div>
              <button
                onClick={() => setShowSummary(true)}
                className="bg-primary text-white px-6 py-3 rounded-2xl flex items-center gap-2 shadow-lg shadow-primary/30 font-bold text-sm"
              >
                Ver Pedido
                <ChevronRight size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSummary && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-end justify-center p-4 lg:p-0"
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="bg-white w-full max-w-md rounded-t-[3rem] p-6 max-h-[85vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-title text-2xl text-primary">Mi Pedido</h2>
                <button
                  onClick={() => setShowSummary(false)}
                  className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center"
                >
                  <X size={20} className="text-gray-400" />
                </button>
              </div>
              <div className="space-y-3 mb-6">
                {cart.map(item => (
                  <div
                    key={`${item.nombre}-${item.precio}`}
                    className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl"
                  >
                    <div className="flex-1 min-w-0">
                      <h4 className="font-dish font-semibold text-dark text-sm truncate">{item.nombre}</h4>
                      <p className="font-dish text-xs text-primary font-bold">{item.precio}</p>
                    </div>
                    <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-xl border border-gray-100">
                      <button onClick={() => updateQuantity(item.nombre, item.precio, -1)} className="text-gray-400">
                        <Minus size={16} />
                      </button>
                      <span className="font-dish font-bold text-sm w-4 text-center">{item.cantidad}</span>
                      <button onClick={() => updateQuantity(item.nombre, item.precio, 1)} className="text-primary">
                        <Plus size={16} />
                      </button>
                    </div>
                    <button
                      onClick={() => updateQuantity(item.nombre, item.precio, -item.cantidad)}
                      className="text-red-300 ml-1"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Summary Breakdown */}
              <div className="border-t border-dashed border-gray-200 pt-4 mb-4 space-y-2">
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>Subtotal productos:</span>
                  <span className="font-semibold text-dark">S/.{calculateSubtotal().toFixed(2)}</span>
                </div>
                {calculateEnvaseFee() > 0 && (
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>📦 Envase ({calculateDishesCount()} plato{calculateDishesCount() > 1 ? 's' : ''} x S/.1.00):</span>
                    <span className="font-semibold text-dark">S/.{calculateEnvaseFee().toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                  <h3 className="font-dish text-xl font-bold text-dark">Total a pagar</h3>
                  <h3 className="font-dish text-xl font-bold text-primary">S/.{calculateTotal().toFixed(2)}</h3>
                </div>
              </div>

              {/* Delivery Note */}
              <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-3 mb-6 text-xs text-amber-900 flex items-start gap-2.5">
                <span className="text-base shrink-0">🛵</span>
                <p className="leading-snug">
                  <strong>Nota de envío:</strong> Si tu dirección es cercana a nuestro local, el envío es <strong>GRATIS</strong>. Si la dirección es alejada, se aplicará un costo de envío adicional.
                </p>
              </div>

              <button
                onClick={sendToWhatsApp}
                className="w-full bg-[#25D366] text-white py-4 rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-green-100 hover:scale-[1.02] transition-transform font-bold"
              >
                Enviar Pedido a WhatsApp
                <ChevronRight size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-6 right-6 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              <X size={28} />
            </button>
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              src={selectedImage}
              alt="Plato ampliado"
              className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showBirthdayForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-sm rounded-[2rem] p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setShowBirthdayForm(false)}
                className="absolute top-4 right-4 w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center"
              >
                <X size={18} className="text-gray-400" />
              </button>

              <div className="flex flex-col items-center text-center mb-5 mt-2">
                <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mb-3">
                  <Gift size={24} className="text-secondary" />
                </div>
                <h2 className="font-title text-2xl text-dark leading-none mb-2">¡Tu Cumpleaños!</h2>
                <p className="text-xs text-gray-500">Déjanos tus datos para enviarte una sorpresa en tu día especial.</p>
              </div>

              {birthdaySuccess ? (
                <div className="bg-green-50 text-green-600 p-4 rounded-2xl text-center text-sm font-bold border border-green-100">
                  ¡Gracias! Tus datos han sido guardados.
                </div>
              ) : (
                <form onSubmit={handleBirthdaySubmit} className="space-y-3">
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Nombre Completo</label>
                    <input required type="text" value={birthdayData.nombre} onChange={e => setBirthdayData({...birthdayData, nombre: e.target.value})} className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-secondary/50 transition-colors" placeholder="Ej. Juan Pérez" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Teléfono</label>
                    <input required type="tel" minLength={9} maxLength={11} pattern="[0-9]*" value={birthdayData.telefono} onChange={e => {
                      const val = e.target.value.replace(/\D/g, '');
                      setBirthdayData({...birthdayData, telefono: val});
                    }} className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-secondary/50 transition-colors" placeholder="Ej. 987654321" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Fecha de Nacimiento</label>
                    <input required type="date" value={birthdayData.fechaNacimiento} onChange={e => setBirthdayData({...birthdayData, fechaNacimiento: e.target.value})} className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-secondary/50 transition-colors text-gray-700" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Distrito</label>
                    <input required type="text" value={birthdayData.distrito} onChange={e => setBirthdayData({...birthdayData, distrito: e.target.value})} className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-secondary/50 transition-colors" placeholder="Ej. Miraflores" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Correo Electrónico (Opcional)</label>
                    <input type="email" value={birthdayData.correo} onChange={e => setBirthdayData({...birthdayData, correo: e.target.value})} className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-secondary/50 transition-colors" placeholder="correo@ejemplo.com" />
                  </div>
                  
                  <button disabled={isSubmittingBirthday} type="submit" className="w-full bg-secondary text-white py-3 rounded-xl font-bold text-sm shadow-md shadow-secondary/20 mt-2 disabled:opacity-70 flex justify-center items-center">
                    {isSubmittingBirthday ? <Loader2 size={18} className="animate-spin" /> : "Guardar mis datos"}
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showReviewForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-sm rounded-[2rem] p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setShowReviewForm(false)}
                className="absolute top-4 right-4 w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center"
              >
                <X size={18} className="text-gray-400" />
              </button>

              <div className="flex flex-col items-center text-center mb-5 mt-2">
                <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center mb-3">
                  <Star size={24} className="text-primary fill-primary" />
                </div>
                <h2 className="font-title text-2xl text-dark leading-none mb-2">¡Calificanos!</h2>
                <p className="text-xs text-gray-500">Tu opinión es muy importante para nosotros.</p>
              </div>

              {reviewSuccess ? (
                <div className="bg-green-50 text-green-600 p-4 rounded-2xl text-center text-sm font-bold border border-green-100">
                  ¡Gracias por tu reseña! Nos ayuda a mejorar.
                </div>
              ) : (
                <form onSubmit={handleReviewSubmit} className="space-y-5">
                  
                  <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex flex-col items-center">
                    <p className="text-xs font-bold text-gray-500 mb-2">Atención del Mozo</p>
                    <div className="flex gap-1">
                      {[1,2,3,4,5].map(star => (
                        <button 
                          key={star} type="button" 
                          onClick={() => setReviewData({...reviewData, estrellasMozo: star})}
                          className="p-1 transition-transform hover:scale-110"
                        >
                          <Star size={28} className={reviewData.estrellasMozo >= star ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex flex-col items-center">
                    <p className="text-xs font-bold text-gray-500 mb-2">Calidad de la Comida</p>
                    <div className="flex gap-1">
                      {[1,2,3,4,5].map(star => (
                        <button 
                          key={star} type="button" 
                          onClick={() => setReviewData({...reviewData, estrellasComida: star})}
                          className="p-1 transition-transform hover:scale-110"
                        >
                          <Star size={28} className={reviewData.estrellasComida >= star ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Comentario (Opcional)</label>
                    <textarea 
                      rows={3} 
                      value={reviewData.comentario} 
                      onChange={e => setReviewData({...reviewData, comentario: e.target.value})} 
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-colors resize-none mt-1" 
                      placeholder="Cuéntanos más sobre tu experiencia..." 
                    />
                  </div>
                  
                  <button disabled={isSubmittingReview} type="submit" className="w-full bg-primary text-white py-3 rounded-xl font-bold text-sm shadow-md shadow-primary/20 mt-2 disabled:opacity-70 flex justify-center items-center">
                    {isSubmittingReview ? <Loader2 size={18} className="animate-spin" /> : "Enviar Reseña"}
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🥤 Modal para elegir opción de Gaseosa (Inka Kola / Coca Cola) */}
      <AnimatePresence>
        {selectedDishForOptions && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedDishForOptions(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedDishForOptions(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 bg-gray-100 p-2 rounded-full transition-colors"
              >
                <X size={18} />
              </button>

              <div className="text-center mb-5">
                <div className="w-14 h-14 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-2 text-2xl">
                  🥤
                </div>
                <h3 className="font-dish font-bold text-lg text-dark">
                  {selectedDishForOptions.dish.nombre}
                </h3>
                <p className="text-xs text-gray-500 mt-1">Personaliza tu bebida</p>
              </div>

              {selectedDishForOptions.dish.nombre.toLowerCase().includes('refresco') ? (
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-2 text-left">1. Selecciona el sabor</label>
                    <div className="grid grid-cols-2 gap-2">
                      {['Chicha Morada', 'Maracuyá'].map((sabor) => (
                        <button
                          key={sabor}
                          type="button"
                          onClick={() => setSelectedOption(sabor)}
                          className={`p-3 rounded-2xl border-2 font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                            selectedOption === sabor
                              ? 'border-primary bg-primary/5 text-primary shadow-sm'
                              : 'border-gray-200 text-gray-700 hover:border-gray-300 bg-gray-50/50'
                          }`}
                        >
                          <span>{sabor.includes('Chicha') ? '🟣' : '🟡'}</span>
                          <span>{sabor}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-2 text-left">2. Selecciona el tamaño</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { size: '1/2 Litro', price: 'S/. 8.00' },
                        { size: '1 Litro', price: 'S/. 15.00' }
                      ].map(({ size, price }) => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setSelectedSize(size)}
                          className={`p-3 rounded-2xl border-2 font-bold text-xs flex flex-col items-center justify-center transition-all ${
                            selectedSize === size
                              ? 'border-primary bg-primary/5 text-primary shadow-sm'
                              : 'border-gray-200 text-gray-700 hover:border-gray-300 bg-gray-50/50'
                          }`}
                        >
                          <span>{size}</span>
                          <span className="text-[11px] font-semibold text-primary mt-0.5">{price}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 mb-6">
                  {(selectedDishForOptions.dish.opciones || ["Inka Kola", "Coca Cola"]).map((op) => (
                    <button
                      key={op}
                      type="button"
                      onClick={() => setSelectedOption(op)}
                      className={`w-full p-4 rounded-2xl border-2 font-bold text-sm flex items-center justify-between transition-all duration-200 ${
                        selectedOption === op
                          ? 'border-primary bg-primary/5 text-primary shadow-sm'
                          : 'border-gray-200 text-gray-700 hover:border-gray-300 bg-gray-50/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">
                          {op.toLowerCase().includes('inka') ? '🟡' :
                           op.toLowerCase().includes('coca') ? '🔴' :
                           op.toLowerCase().includes('chicha') ? '🟣' :
                           op.toLowerCase().includes('maracuya') || op.toLowerCase().includes('maracuyá') ? '🟡' : '🍹'}
                        </span>
                        <span>{op}</span>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedOption === op ? 'border-primary bg-primary' : 'border-gray-300'
                      }`}>
                        {selectedOption === op && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                    </button>
                  ))}
                </div>
              )}

              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={confirmAddToCartWithOptions}
                className="w-full bg-primary text-white py-3.5 rounded-2xl font-bold text-sm shadow-lg shadow-primary/25 flex items-center justify-center gap-2"
              >
                <Plus size={18} strokeWidth={2.5} />
                Agregar al pedido • {
                  selectedDishForOptions.dish.nombre.toLowerCase().includes('refresco')
                    ? (selectedSize === '1 Litro' ? 'S/. 15.00' : 'S/. 8.00')
                    : selectedDishForOptions.dish.precio
                }
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
