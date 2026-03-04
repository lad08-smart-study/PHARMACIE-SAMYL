config_js = """// ============================================
// PHARMACIE SAMY - Configuration
// ============================================

const CONFIG = {
    // Supabase Configuration - REPLACE WITH YOUR ACTUAL CREDENTIALS
    SUPABASE_URL: 'https://your-project.supabase.co',
    SUPABASE_ANON_KEY: 'your-anon-key-here',
    
    // Google Maps - Pharmacie AMAROUAYACHE Samy Les Sources
    PHARMACY_LOCATION: {
        name: "Pharmacie AMAROUAYACHE Samy Les sources",
        address: "Cité 400 logements, local 40, 41 les sources, Bir Mourad Rais",
        mapsUrl: "https://www.google.com/maps/place/Pharmacie+AMAROUAYACHE+Samy+Les+sources/@36.7456,3.0584,17z",
        embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3196.1234567890123!2d3.0584!3d36.7456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128fad2a0abcdef%3A0x1234567890abcdef!2sPharmacie%20AMAROUAYACHE%20Samy%20Les%20sources!5e0!3m2!1sfr!2sdz!4v1234567890123!5m2!1sfr!2sdz",
        coordinates: {
            lat: 36.7456,
            lng: 3.0584
        }
    },
    
    // Social Links
    SOCIAL: {
        instagram: 'https://www.instagram.com/pharmaciesamy/',
        tiktok: 'https://www.tiktok.com/@pharmacie.samy',
        whatsapp: 'https://wa.me/213770762987',
        phone: '+213770762987'
    },
    
    // App Settings
    ITEMS_PER_PAGE: 12,
    DEFAULT_LANGUAGE: 'fr'
};

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
"""

# 2. i18n.js - Internationalization (FIXED)
i18n_js = """// ============================================
// PHARMACIE SAMY - Internationalization (FIXED)
// ============================================

const I18N = {
    currentLang: localStorage.getItem('lang') || 'fr',
    
    translations: {
        fr: {
            nav_home: 'Accueil',
            nav_catalogue: 'Catalogue',
            nav_about: 'À propos',
            nav_contact: 'Contact',
            nav_admin: 'Admin',
            hero_subtitle: 'Votre santé, notre priorité',
            hero_hours: '7/7 — 08:00 à 00:00',
            hero_cta: 'Voir le catalogue',
            categories_title: 'Nos Catégories',
            categories_subtitle: 'Découvrez nos produits par catégorie',
            products_title: 'Nos Produits',
            products_subtitle: 'Une sélection de produits de qualité',
            footer_follow: 'Suivez-nous',
            footer_rights: 'Tous droits réservés',
            breadcrumb_home: 'Accueil',
            breadcrumb_catalogue: 'Catalogue',
            filter_search: 'Rechercher un produit...',
            filter_category: 'Catégorie',
            filter_brand: 'Marque',
            filter_all: 'Tous',
            filter_sort: 'Trier par',
            filter_price: 'Prix',
            sort_newest: 'Plus récents',
            sort_price_asc: 'Prix croissant',
            sort_price_desc: 'Prix décroissant',
            sort_name_asc: 'Nom A-Z',
            sort_name_desc: 'Nom Z-A',
            contact_title: 'Contactez-nous',
            contact_subtitle: 'Nous sommes là pour vous aider',
            contact_whatsapp: 'WhatsApp',
            contact_instagram: 'Instagram',
            contact_tiktok: 'TikTok',
            contact_hours: 'Horaires',
            contact_directions: 'Itinéraire',
            contact_address: 'Voir sur Google Maps',
            about_title: 'À propos de nous',
            about_subtitle: 'Votre pharmacie de confiance',
            about_welcome: 'Bienvenue à la Pharmacie SAMY',
            about_description: 'Nous sommes dévoués à votre santé et votre bien-être. Notre équipe de professionnels qualifiés est à votre service 7 jours sur 7.',
            about_hours_title: 'Nos Horaires',
            about_services_title: 'Nos Services',
            about_service_1: 'Conseil pharmaceutique personnalisé',
            about_service_2: 'Large gamme de produits dermocosmétiques',
            about_service_3: 'Compléments alimentaires de qualité',
            about_service_4: 'Produits pour maman et bébé',
            admin_title: 'Administration',
            admin_login_with_google: 'Connexion avec Google',
            admin_products: 'Produits',
            admin_categories: 'Catégories',
            admin_brands: 'Marques',
            admin_add: 'Ajouter',
            admin_save: 'Sauvegarder',
            admin_cancel: 'Annuler',
            admin_name: 'Nom',
            admin_price: 'Prix',
            admin_active: 'Actif',
            admin_actions: 'Actions',
            admin_logout: 'Déconnexion'
        },
        en: {
            nav_home: 'Home',
            nav_catalogue: 'Catalog',
            nav_about: 'About',
            nav_contact: 'Contact',
            nav_admin: 'Admin',
            hero_subtitle: 'Your health, our priority',
            hero_hours: '7/7 — 08:00 to 00:00',
            hero_cta: 'View catalog',
            categories_title: 'Our Categories',
            categories_subtitle: 'Discover our products by category',
            products_title: 'Our Products',
            products_subtitle: 'A selection of quality products',
            footer_follow: 'Follow us',
            footer_rights: 'All rights reserved',
            breadcrumb_home: 'Home',
            breadcrumb_catalogue: 'Catalog',
            filter_search: 'Search for a product...',
            filter_category: 'Category',
            filter_brand: 'Brand',
            filter_all: 'All',
            filter_sort: 'Sort by',
            filter_price: 'Price',
            sort_newest: 'Newest',
            sort_price_asc: 'Price: Low to High',
            sort_price_desc: 'Price: High to Low',
            sort_name_asc: 'Name A-Z',
            sort_name_desc: 'Name Z-A',
            contact_title: 'Contact Us',
            contact_subtitle: 'We are here to help you',
            contact_whatsapp: 'WhatsApp',
            contact_instagram: 'Instagram',
            contact_tiktok: 'TikTok',
            contact_hours: 'Hours',
            contact_directions: 'Directions',
            contact_address: 'View on Google Maps',
            about_title: 'About Us',
            about_subtitle: 'Your trusted pharmacy',
            about_welcome: 'Welcome to Pharmacie SAMY',
            about_description: 'We are dedicated to your health and well-being. Our team of qualified professionals is at your service 7 days a week.',
            about_hours_title: 'Our Hours',
            about_services_title: 'Our Services',
            about_service_1: 'Personalized pharmaceutical advice',
            about_service_2: 'Wide range of dermocosmetic products',
            about_service_3: 'Quality food supplements',
            about_service_4: 'Products for mom and baby',
            admin_title: 'Administration',
            admin_login_with_google: 'Login with Google',
            admin_products: 'Products',
            admin_categories: 'Categories',
            admin_brands: 'Brands',
            admin_add: 'Add',
            admin_save: 'Save',
            admin_cancel: 'Cancel',
            admin_name: 'Name',
            admin_price: 'Price',
            admin_active: 'Active',
            admin_actions: 'Actions',
            admin_logout: 'Logout'
        },
        ar: {
            nav_home: 'الرئيسية',
            nav_catalogue: 'المنتجات',
            nav_about: 'من نحن',
            nav_contact: 'اتصل بنا',
            nav_admin: 'الإدارة',
            hero_subtitle: 'صحتك، أولويتنا',
            hero_hours: 'طوال الأسبوع — 08:00 إلى 00:00',
            hero_cta: 'عرض المنتجات',
            categories_title: 'فئاتنا',
            categories_subtitle: 'اكتشف منتجاتنا حسب الفئة',
            products_title: 'منتجاتنا',
            products_subtitle: 'مجموعة مختارة من المنتجات عالية الجودة',
            footer_follow: 'تابعنا',
            footer_rights: 'جميع الحقوق محفوظة',
            breadcrumb_home: 'الرئيسية',
            breadcrumb_catalogue: 'المنتجات',
            filter_search: 'البحث عن منتج...',
            filter_category: 'الفئة',
            filter_brand: 'العلامة التجارية',
            filter_all: 'الكل',
            filter_sort: 'ترتيب حسب',
            filter_price: 'السعر',
            sort_newest: 'الأحدث',
            sort_price_asc: 'السعر: من الأقل للأعلى',
            sort_price_desc: 'السعر: من الأعلى للأقل',
            sort_name_asc: 'الاسم أ-ي',
            sort_name_desc: 'الاسم ي-أ',
            contact_title: 'اتصل بنا',
            contact_subtitle: 'نحن هنا لمساعدتك',
            contact_whatsapp: 'واتساب',
            contact_instagram: 'إنستغرام',
            contact_tiktok: 'تيك توك',
            contact_hours: 'ساعات العمل',
            contact_directions: 'الاتجاهات',
            contact_address: 'عرض على خرائط جوجل',
            about_title: 'من نحن',
            about_subtitle: 'صيدليتك الموثوقة',
            about_welcome: 'مرحباً بكم في صيدلية سامي',
            about_description: 'نحن مكرسون لصحتك ورفاهيتك. فريقنا من المحترفين المؤهلين في خدمتك 7 أيام في الأسبوع.',
            about_hours_title: 'ساعات العمل',
            about_services_title: 'خدماتنا',
            about_service_1: 'استشارة صيدلانية شخصية',
            about_service_2: 'مجموعة واسعة من منتجات التجميل',
            about_service_3: 'مكملات غذائية عالية الجودة',
            about_service_4: 'منتجات للأم والطفل',
            admin_title: 'الإدارة',
            admin_login_with_google: 'تسجيل الدخول بجوجل',
            admin_products: 'المنتجات',
            admin_categories: 'الفئات',
            admin_brands: 'العلامات التجارية',
            admin_add: 'إضافة',
            admin_save: 'حفظ',
            admin_cancel: 'إلغاء',
            admin_name: 'الاسم',
            admin_price: 'السعر',
            admin_active: 'نشط',
            admin_actions: 'إجراءات',
            admin_logout: 'تسجيل الخروج'
        }
    },
    
    init() {
        this.updatePageLanguage();
        this.setupLanguageSwitcher();
    },
    
    setupLanguageSwitcher() {
        const switcher = document.querySelector('.lang-switcher');
        if (!switcher) return;
        
        switcher.addEventListener('click', (e) => {
            if (e.target.classList.contains('lang-btn')) {
                const lang = e.target.dataset.lang;
                this.setLanguage(lang);
            }
        });
    },
    
    setLanguage(lang) {
        if (!this.translations[lang]) return;
        
        this.currentLang = lang;
        localStorage.setItem('lang', lang);
        
        // Update HTML lang and dir
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        
        // Update active button
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });
        
        this.updatePageLanguage();
        
        // Reload page to apply RTL/LTR changes fully
        if (lang === 'ar' || document.documentElement.dir === 'rtl') {
            window.location.reload();
        }
    },
    
    updatePageLanguage() {
        const texts = this.translations[this.currentLang];
        if (!texts) return;
        
        // Update all elements with data-i18n
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            if (texts[key]) {
                el.textContent = texts[key];
            }
        });
        
        // Update placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.dataset.i18nPlaceholder;
            if (texts[key]) {
                el.placeholder = texts[key];
            }
        });
        
        // Update active button state
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === this.currentLang);
        });
    },
    
    t(key) {
        return this.translations[this.currentLang]?.[key] || key;
    }
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    I18N.init();
});
"""
