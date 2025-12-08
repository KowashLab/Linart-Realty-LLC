import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      'vaul@1.1.2': 'vaul',
      '@': path.resolve(__dirname, './'),
      '@styles': path.resolve(__dirname, './styles'),
    },
  },
  css: {
    postcss: './postcss.config.js',
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    target: 'esnext',
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
    minify: 'esbuild',
    cssMinify: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // React core
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react-vendor';
          }
          
          // Framer Motion
          if (id.includes('node_modules/framer-motion')) {
            return 'motion-vendor';
          }
          
          // All Radix UI components
          if (id.includes('@radix-ui')) {
            return 'radix-vendor';
          }
          
          // Supabase
          if (id.includes('@supabase')) {
            return 'supabase-vendor';
          }
          
          // Charts and heavy libraries
          if (id.includes('recharts') || id.includes('d3-')) {
            return 'charts-vendor';
          }
          
          // Form libraries
          if (id.includes('react-hook-form') || id.includes('react-day-picker')) {
            return 'forms-vendor';
          }
          
          // Icons
          if (id.includes('lucide-react')) {
            return 'icons-vendor';
          }
          
          // Admin pages - lazy load
          if (id.includes('/pages/Admin') || id.includes('/components/Admin')) {
            return 'admin-pages';
          }
          
          // Other node_modules
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
  server: {
    port: 3000,
    strictPort: false,
    host: true,
    open: true,
  },
});