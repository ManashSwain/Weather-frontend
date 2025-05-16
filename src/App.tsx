import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from './components/layout';
import { ThemeProvider } from './context/theme-provider';
import WeatherDashboard from './pages/weather-dashboard';
import CityPage from './pages/city-page';
import {
  QueryClientProvider,
   QueryClient
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';
const queryClient = new QueryClient({
  defaultOptions : {
    queries : {
      staleTime : 5*60*1000,
      gcTime : 10 *60*1000,
      retry : false,
      refetchOnWindowFocus : false
    }
  }
});

function App() {
  
  return (
    <>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
     <BrowserRouter>
     <ThemeProvider defaultTheme="dark">
     <Layout>  
        <Routes>
          <Route path='/'element={<WeatherDashboard/>}/>
          <Route path='/city/:cityName'element={<CityPage/>}/>
        </Routes>
     </Layout>
     </ThemeProvider>
     </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
      </ErrorBoundary>
  </QueryClientProvider>
    </>
  )
}

export default App
