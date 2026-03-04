app_js = """// ============================================
// PHARMACIE SAMY - Main Application (FIXED)
// ============================================

// Initialize Supabase client
let supabaseClient = null;

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initSupabase();
    initMobileMenu();
    initPageSpecific();
});

// Initialize Supabase
function initSupabase() {
    try {
        if (typeof CONFIG !== 'undefined' && CONFIG.SUPABASE_URL && CONFIG.SUPABASE_ANON_KEY) {
            supabaseClient = supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_ANON_KEY);
            console.log('Supabase initialized');
        } else {
            console.warn('Supabase config not found');
            // Show demo data for testing
            loadDemoData();
        }
    } catch (error) {
        console.error('Supabase init error:', error);
        loadDemoData();
    }
}

// Mobile Menu Toggle
function initMobileMenu() {
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
            toggle.setAttribute('aria-expanded', !isExpanded);
            nav.classList.toggle('active');
        });
    }
}

// Page-specific initialization
function initPageSpecific() {
    const path = window.location.pathname;
    
    if (path.includes('index') || path === '/' || path === '') {
        initHomePage();
    } else if (path.includes('catalogue')) {
        initCataloguePage();
    } else if (path.includes('category')) {
        initCategoryPage();
    } else if (path.includes('product')) {
        initProductPage();
    } else if (path.includes('brand')) {
        initBrandPage();
    } else if (path.includes('contact')) {
        initContactPage();
    }
}

// ============================================
// HOME PAGE
// ============================================
async function initHomePage() {
    await loadCategories();
    await loadFeaturedProducts();
}

async function loadCategories() {
    const grid = document.getElementById('categories-grid');
    if (!grid) return;
    
    try {
        let categories = [];
        
        if (supabaseClient) {
            const { data, error } = await supabaseClient
                .from('categories')
                .select('*')
                .eq('actif', true)
                .order('ordre');
            
            if (error) throw error;
            categories = data || [];
        }
        
        // If no data from DB, use demo data
        if (categories.length === 0) {
            categories = getDemoCategories();
        }
        
        renderCategories(grid, categories);
    } catch (error) {
        console.error('Error loading categories:', error);
        renderCategories(grid, getDemoCategories());
    }
}

function renderCategories(container, categories) {
    const lang = I18N?.currentLang || 'fr';
    const nameField = `name_${lang}`;
    
    container.innerHTML = categories.map(cat => `
        <a href="category.html?slug=${cat.slug}" class="category-card">
            <img src="${cat.image_url || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop'}" 
                 alt="${cat[nameField] || cat.name_fr}" 
                 loading="lazy">
            <div class="category-card-overlay">
                <h3 class="category-card-title">${cat[nameField] || cat.name_fr}</h3>
            </div>
        </a>
    `).join('');
}

async function loadFeaturedProducts() {
    const grid = document.getElementById('featured-products');
    if (!grid) return;
    
    try {
        let products = [];
        
        if (supabaseClient) {
            const { data, error } = await supabaseClient
                .from('products')
                .select('*, categories(*), brands(*)')
                .eq('actif', true)
                .limit(8);
            
            if (error) throw error;
            products = data || [];
        }
        
        if (products.length === 0) {
            products = getDemoProducts();
        }
        
        renderProducts(grid, products);
    } catch (error) {
        console.error('Error loading products:', error);
        renderProducts(grid, getDemoProducts());
    }
}

// ============================================
// CATALOGUE PAGE
// ============================================
async function initCataloguePage() {
    await loadFilterOptions();
    await loadCatalogueProducts();
    setupFilters();
}

async function loadFilterOptions() {
    try {
        // Load categories for filter
        const categorySelect = document.getElementById('filter-category');
        if (categorySelect && supabaseClient) {
            const { data: categories } = await supabaseClient
                .from('categories')
                .select('*')
                .eq('actif', true)
                .order('ordre');
            
            if (categories) {
                categories.forEach(cat => {
                    const option = document.createElement('option');
                    option.value = cat.slug;
                    option.textContent = cat.name_fr;
                    categorySelect.appendChild(option);
                });
            }
        }
        
        // Load brands for filter
        const brandSelect = document.getElementById('filter-brand');
        if (brandSelect && supabaseClient) {
            const { data: brands } = await supabaseClient
                .from('brands')
                .select('*')
                .eq('actif', true)
                .order('name');
            
            if (brands) {
                brands.forEach(brand => {
                    const option = document.createElement('option');
                    option.value = brand.slug;
                    option.textContent = brand.name;
                    brandSelect.appendChild(option);
                });
            }
        }
    } catch (error) {
        console.error('Error loading filters:', error);
    }
}

async function loadCatalogueProducts() {
    const grid = document.getElementById('products-grid');
    if (!grid) return;
    
    try {
        let products = [];
        
        if (supabaseClient) {
            const { data, error } = await supabaseClient
                .from('products')
                .select('*, categories(*), brands(*)')
                .eq('actif', true);
            
            if (error) throw error;
            products = data || [];
        }
        
        if (products.length === 0) {
            products = getDemoProducts();
        }
        
        renderProducts(grid, products);
    } catch (error) {
        console.error('Error loading catalogue:', error);
        renderProducts(grid, getDemoProducts());
    }
}

function setupFilters() {
    const searchInput = document.getElementById('search-input');
    const categoryFilter = document.getElementById('filter-category');
    const brandFilter = document.getElementById('filter-brand');
    const sortSelect = document.getElementById('sort-select');
    const minPrice = document.getElementById('min-price');
    const maxPrice = document.getElementById('max-price');
    
    const applyFilters = () => {
        // This would filter the products in a real implementation
        console.log('Applying filters...');
    };
    
    searchInput?.addEventListener('input', debounce(applyFilters, 300));
    categoryFilter?.addEventListener('change', applyFilters);
    brandFilter?.addEventListener('change', applyFilters);
    sortSelect?.addEventListener('change', applyFilters);
    minPrice?.addEventListener('input', debounce(applyFilters, 300));
    maxPrice?.addEventListener('input', debounce(applyFilters, 300));
}

// ============================================
// CATEGORY PAGE
// ============================================
async function initCategoryPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const slug = urlParams.get('slug');
    
    if (!slug) return;
    
    try {
        let category = null;
        let products = [];
        
        if (supabaseClient) {
            // Load category
            const { data: catData } = await supabaseClient
                .from('categories')
                .select('*')
                .eq('slug', slug)
                .single();
            
            category = catData;
            
            // Load products
            const { data: prodData } = await supabaseClient
                .from('products')
                .select('*, brands(*)')
                .eq('actif', true)
                .eq('category_id', category?.id);
            
            products = prodData || [];
        }
        
        if (!category) {
            category = getDemoCategories().find(c => c.slug === slug) || getDemoCategories()[0];
        }
        
        if (products.length === 0) {
            products = getDemoProducts().filter(p => p.category_id === category.id);
        }
        
        // Update page title
        const titleEl = document.getElementById('category-title');
        const breadcrumbEl = document.getElementById('breadcrumb-current');
        const lang = I18N?.currentLang || 'fr';
        const nameField = `name_${lang}`;
        
        if (titleEl) titleEl.textContent = category[nameField] || category.name_fr;
        if (breadcrumbEl) breadcrumbEl.textContent = category[nameField] || category.name_fr;
        
        // Render products
        const grid = document.getElementById('products-grid');
        if (grid) {
            renderProducts(grid, products.length > 0 ? products : getDemoProducts());
        }
        
    } catch (error) {
        console.error('Error loading category:', error);
        const grid = document.getElementById('products-grid');
        if (grid) renderProducts(grid, getDemoProducts());
    }
}

// ============================================
// PRODUCT PAGE
// ============================================
async function initProductPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const slug = urlParams.get('slug');
    
    if (!slug) return;
    
    // Load product details
    console.log('Loading product:', slug);
}

// ============================================
// BRAND PAGE
// ============================================
async function initBrandPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const slug = urlParams.get('slug');
    
    if (!slug) return;
    
    try {
        let brand = null;
        let products = [];
        
        if (supabaseClient) {
            const { data: brandData } = await supabaseClient
                .from('brands')
                .select('*')
                .eq('slug', slug)
                .single();
            
            brand = brandData;
            
            if (brand) {
                const { data: prodData } = await supabaseClient
                    .from('products')
                    .select('*, categories(*)')
                    .eq('actif', true)
                    .eq('brand_id', brand.id);
                
                products = prodData || [];
            }
        }
        
        if (!brand) {
            brand = { name: 'Marque', slug: slug };
        }
        
        // Update page
        const titleEl = document.getElementById('brand-title');
        const breadcrumbEl = document.getElementById('breadcrumb-current');
        
        if (titleEl) titleEl.textContent = brand.name;
        if (breadcrumbEl) breadcrumbEl.textContent = brand.name;
        
        // Render products
        const grid = document.getElementById('products-grid');
        if (grid) {
            renderProducts(grid, products.length > 0 ? products : getDemoProducts());
        }
        
    } catch (error) {
        console.error('Error loading brand:', error);
        const grid = document.getElementById('products-grid');
        if (grid) renderProducts(grid, getDemoProducts());
    }
}

// ============================================
// CONTACT PAGE (FIXED MAP)
// ============================================
function initContactPage() {
    // Update map with correct pharmacy location
    const mapIframe = document.querySelector('.contact-map iframe');
    if (mapIframe && typeof CONFIG !== 'undefined') {
        mapIframe.src = CONFIG.PHARMACY_LOCATION.embedUrl;
    }
    
    // Update directions link
    const directionsLink = document.getElementById('directions-link');
    if (directionsLink && typeof CONFIG !== 'undefined') {
        directionsLink.href = CONFIG.PHARMACY_LOCATION.mapsUrl;
    }
}

// ============================================
// RENDER FUNCTIONS
// ============================================
function renderProducts(container, products) {
    if (!container) return;
    
    if (products.length === 0) {
        container.innerHTML = '<p class="text-center">Aucun produit trouvé</p>';
        return;
    }
    
    const lang = I18N?.currentLang || 'fr';
    const nameField = `name_${lang}`;
    
    container.innerHTML = products.map(product => {
        const name = product[nameField] || product.name_fr || product.name;
        const brand = product.brands?.name || product.brand || '';
        const price = product.price ? `${product.price} DZD` : 'Prix sur demande';
        const image = product.image_url || product.images?.[0] || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop';
        const slug = product.slug || product.id;
        
        return `
            <article class="product-card" role="listitem">
                <a href="product.html?slug=${slug}" style="text-decoration: none; color: inherit;">
                    <img src="${image}" 
                         alt="${name}" 
                         class="product-image"
                         loading="lazy"
                         onerror="this.src='https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop'">
                    <div class="product-info">
                        ${brand ? `<p class="product-brand">${brand}</p>` : ''}
                        <h3 class="product-name">${name}</h3>
                        <p class="product-price">${price}</p>
                    </div>
                </a>
            </article>
        `;
    }).join('');
}

// ============================================
// DEMO DATA (For testing without Supabase)
// ============================================
function getDemoCategories() {
    return [
        {
            id: '1',
            slug: 'dermocosmetique',
            name_fr: 'Dermocosmétique',
            name_en: 'Dermocosmetics',
            name_ar: 'العناية بالبشرة',
            ordre: 1,
            image_url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop'
        },
        {
            id: '2',
            slug: 'complements-alimentaires',
            name_fr: 'Compléments alimentaires',
            name_en: 'Food Supplements',
            name_ar: 'المكملات الغذائية',
            ordre: 2,
            image_url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop'
        },
        {
            id: '3',
            slug: 'maman-bebe',
            name_fr: 'Maman & Bébé',
            name_en: 'Mom & Baby',
            name_ar: 'الأم والطفل',
            ordre: 3,
            image_url: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=400&fit=crop'
        },
        {
            id: '4',
            slug: 'hygiene-bucco-dentaire',
            name_fr: 'Hygiène bucco-dentaire',
            name_en: 'Oral Hygiene',
            name_ar: 'نظافة الفم',
            ordre: 4,
            image_url: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&h=400&fit=crop'
        }
    ];
}

function getDemoProducts() {
    return [
        {
            id: '1',
            slug: 'la-roche-posay-effaclar',
            name_fr: 'La Roche-Posay Effaclar',
            name_en: 'La Roche-Posay Effaclar',
            name_ar: 'لاروش بوزيه إيفاكلار',
            price: 4500,
            brand: 'La Roche-Posay',
            category_id: '1',
            image_url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=300&fit=crop'
        },
        {
            id: '2',
            slug: 'bioderma-sensibio',
            name_fr: 'Bioderma Sensibio H2O',
            name_en: 'Bioderma Sensibio H2O',
            name_ar: 'بيوديرما سينسيبيو',
            price: 3200,
            brand: 'Bioderma',
            category_id: '1',
            image_url: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=300&fit=crop'
        },
        {
            id: '3',
            slug: 'vichy-mineral-89',
            name_fr: 'Vichy Minéral 89',
            name_en: 'Vichy Mineral 89',
            name_ar: 'فيشي مينيرال 89',
            price: 5800,
            brand: 'Vichy',
            category_id: '1',
            image_url: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=400&h=300&fit=crop'
        },
        {
            id: '4',
            slug: 'mustela-creme-change',
            name_fr: 'Mustela Crème Change',
            name_en: 'Mustela Diaper Cream',
            name_ar: 'كريم مستيلا للتغيير',
            price: 1800,
            brand: 'Mustela',
            category_id: '3',
            image_url: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=300&fit=crop'
        }
    ];
}

function loadDemoData() {
    console.log('Loading demo data...');
    // This triggers when Supabase is not configured
    const grid = document.getElementById('categories-grid') || document.getElementById('products-grid');
    if (grid) {
        if (grid.id === 'categories-grid') {
            renderCategories(grid, getDemoCategories());
        } else {
            renderProducts(grid, getDemoProducts());
        }
    }
}

// ============================================
// UTILITIES
// ============================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export for modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initSupabase, renderProducts, renderCategories };
}
