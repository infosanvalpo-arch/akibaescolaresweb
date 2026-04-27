"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Bus as BusIcon,
  MapPin as MapPinIcon,
  Bell as BellIcon,
  ShieldCheck as ShieldIcon,
  Users as UsersIcon,
  Clock as ClockIcon,
  Phone as PhoneIcon,
  Mail as MailIcon,
  Check as CheckIcon,
  Route as RouteIcon,
  MessageSquare as MessageIcon,
  Lock as LockIcon,
  School as SchoolIcon,
  Heart as HeartIcon,
  Menu as MenuIcon,
  X as XIcon,
  Cloud as CloudIcon,
  Database as DatabaseIcon,
  List as ListIcon,
  Send as SendIcon,
  CheckCircle as CheckCircleIcon,
  AlertCircle as AlertCircleIcon,
  Briefcase as BriefcaseIcon,
  Navigation as NavigationIcon,
  Scale as ScaleIcon,
  FileText as FileTextIcon,
  Sun as SunIcon,
  Activity as ActivityIcon,
  HeartPulse as HeartPulseIcon,
  Wrench as WrenchIcon,
  ShieldAlert as ShieldAlertIcon,
  Flame as FlameIcon,
} from "lucide-react";

// ── EmailJS config ──
const EMAILJS_SERVICE_ID  = "service_rok932j";
const EMAILJS_TEMPLATE_ID = "template_ng7vkjh";
const EMAILJS_PUBLIC_KEY  = "-_NtJaMNdYxS2wKY5";

/* ── Intersection Observer hook for scroll-triggered animations ── */
function useScrollAnimation(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // ── Contact form state ──
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", institution: "", message: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setFormStatus("sending");
    try {
      // @ts-ignore — EmailJS loaded from CDN
      await window.emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone || "No indicado",
          institution: formData.institution || "No indicado",
          message: formData.message || "Sin mensaje",
          reply_to: formData.email,
        },
        EMAILJS_PUBLIC_KEY
      );

      setFormStatus("success");
      setFormData({ name: "", email: "", phone: "", institution: "", message: "" });
    } catch (err) {
      console.error("EmailJS error:", err);
      setFormStatus("error");
    }
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Section animation refs */
  const heroContent = useScrollAnimation(0.05);
  const heroPhone = useScrollAnimation(0.05);
  const featuresSection = useScrollAnimation(0.1);
  const dashboardSection = useScrollAnimation(0.1);
  const appSection = useScrollAnimation(0.1);
  const techSection = useScrollAnimation(0.1);
  const benefitsSection = useScrollAnimation(0.1);
  const sgslSection = useScrollAnimation(0.1);
  const contactSection = useScrollAnimation(0.1);

  const navLinks = [
    { href: "#inicio", label: "Inicio" },
    { href: "#nosotros", label: "Nosotros" },
    { href: "#app", label: "Nuestra App" },
    { href: "#beneficios", label: "Beneficios" },
    { href: "#sgsl", label: "SGSL" },
    { href: "#contacto", label: "Contacto" },
  ];

  const features = [
    { icon: MapPinIcon, title: "Seguimiento en Tiempo Real", description: "Conoce la ubicación exacta de cada autobús escolar en todo momento desde tu dispositivo móvil." },
    { icon: BellIcon, title: "Notificaciones Instantáneas", description: "Recibe alertas cuando el bus está llegando, cuando tu hijo sube o baja del autobús." },
    { icon: ShieldIcon, title: "Seguridad Garantizada", description: "Control de acceso y confirmación de abordaje para la máxima seguridad de los estudiantes." },
    { icon: RouteIcon, title: "Gestión de Rutas", description: "Planifica y optimiza las rutas escolares para un servicio más eficiente." },
  ];

  const appFeatures = [
    { title: "Abordaje Seguro", description: "Confirmación digital de cada estudiante al subir y bajar del autobús, con registro automático en tiempo real.", icon: CheckIcon },
    { title: "Seguimiento en Tiempo Real", description: "Visualiza la ubicación exacta del autobús escolar en el mapa con actualizaciones cada 10 segundos.", icon: MapPinIcon },
    { title: "Notificaciones Push", description: "Recibe alertas personalizadas sobre llegadas, salidas, cambios de ruta y cualquier incidencia.", icon: BellIcon },
    { title: "Gestión de Incidencias", description: "Comunicación directa con conductores y administración para reportar y resolver cualquier situación.", icon: MessageIcon },
    { title: "Cambios de Ruta", description: "Solicita cambios temporales o permanentes de ruta directamente desde la aplicación.", icon: RouteIcon },
    { title: "Control de Asistencia", description: "Registro automático de asistencia y notificación de ausencias a la institución educativa.", icon: ListIcon },
  ];

  const techFeatures = [
    { title: "Información cifrada", description: "Algoritmos de alta seguridad" },
    { title: "Datos respaldados", description: "Disponibilidad 99.9%" },
    { title: "Encriptación total", description: "En tránsito y reposo" },
    { title: "Redundancia", description: "Servidores replicados" },
    { title: "Protección DDoS", description: "Prevención de ataques" },
    { title: "Plan de contingencia", description: "Continuidad operativa" },
  ];

  const benefits = [
    { icon: SchoolIcon, title: "Para Colegios", description: "Monitorea todos los autobuses y gestiona rutas, incidentes y solicitudes desde un solo panel de control centralizado." },
    { icon: BriefcaseIcon, title: "Para Transportistas", description: "Gestiona de forma integral toda tu flota de vehículos, asignación de choferes, mantenimientos y control de presupuestos." },
    { icon: NavigationIcon, title: "Para Conductores", description: "Aplicación optimizada para guiar rutas, marcar asistencia a bordo y reportar incidencias con un solo toque." },
    { icon: UsersIcon, title: "Para Padres y Apoderados", description: "Mayor tranquilidad siguiendo en tiempo real el autobús, con notificaciones push precisas de abordaje y descensos." },
  ];

  const legalFramework = [
    { title: "Ley 16.744", desc: "Normas sobre accidentes del trabajo y enfermedades profesionales." },
    { title: "Decreto Supremo 594", desc: "Condiciones sanitarias y ambientales básicas en los lugares de trabajo." },
    { title: "Decreto Supremo 40", desc: "Obligación de informar los riesgos (Prevención de riesgos)." },
    { title: "Decreto Supremo 67", desc: "Permite rebajar la tasa de cotización adicional por tener un SGSL." },
    { title: "Ley 20.123", desc: "Normativas sobre subcontratación y servicios transitorios." },
  ];

  const sgslObligations = [
    { title: "Afiliación a Mutualidad", desc: "Afiliación obligatoria a un organismo administrador (ACHS, Mutual, IST)." },
    { title: "Derecho a Saber (ODI)", desc: "Informar por escrito a los trabajadores sobre los riesgos de su labor." },
    { title: "Reglamento Interno (RIHS)", desc: "Gestionar riesgos y prevenir accidentes definiendo obligaciones y sanciones." },
    { title: "Entrega de EPP", desc: "Proveer sin costo elementos de protección personal y capacitar en su uso." },
  ];

  const criticalRisks = [
    { icon: WrenchIcon, title: "Mantenimiento Preventivo", desc: "Documentar las revisiones mecánicas de los vehículos como parte de la política de seguridad." },
    { icon: FileTextIcon, title: "Procedimientos Seguros", desc: "Prácticas para garantizar la integridad de los estudiantes y la eficiencia del servicio basado en la normativa vigente." },
    { icon: ActivityIcon, title: "Matriz de Riesgos", desc: "Herramienta visual que identifica, evalúa y clasifica peligros, permitiendo priorizar medidas preventivas." },
    { icon: FlameIcon, title: "Uso de Extintores", desc: "Capacitación obligatoria teórico-práctica para identificar fuegos y manejar extintores ante emergencias." },
    { icon: RouteIcon, title: "Seguridad Vial", desc: "Capacitación constante en manejo defensivo y cumplimiento estricto de tiempos de descanso para evitar fatiga." },
    { icon: HeartPulseIcon, title: "Riesgos Psicosociales", desc: "Manejo del estrés y la carga emocional que implica el cuidado y traslado de menores." },
    { icon: ShieldAlertIcon, title: "Protocolo TMERT", desc: "Identificar, evaluar y controlar factores de riesgo ergonómico como fuerza, postura y repetición." },
    { icon: SunIcon, title: "Radiación UV", desc: "Gestionar el riesgo solar entregando bloqueador, ropa protectora y ajustando horarios al aire libre." },
    { icon: ScaleIcon, title: "Ley Karin", desc: "Prevención, investigación y sanción del acoso laboral, sexual y violencia, protegiendo la salud mental." },
  ];

  return (
    <main className="min-h-screen">

      {/* ─── HEADER ─────────────────────────────────── */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg py-3" : "bg-transparent py-5"
      }`}>
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between">
            <a href="#inicio" className="flex items-center gap-3 group">
              <div className={`w-10 h-10 rounded-xl overflow-hidden transition-all duration-300 shadow-md group-hover:shadow-celeste/40 group-hover:scale-110 ${isScrolled ? "shadow-navy/10" : "shadow-white/10"}`}>
                <Image src="/images/logo.png" alt="Akiba Escolares" width={40} height={40} className="object-cover" />
              </div>
              <span className={`text-xl font-bold transition-colors duration-300 ${isScrolled ? "text-navy" : "text-white"}`}>
                Akiba <span className={`${isScrolled ? "text-celeste" : "text-amarillo"}`}>Escolares</span>
              </span>
            </a>

            <ul className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={`font-medium transition-all duration-300 hover:text-celeste relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-celeste after:transition-all after:duration-300 hover:after:w-full ${isScrolled ? "text-navy/80" : "text-white/90"}`}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="hidden md:flex">
              <Button asChild className="bg-amarillo hover:bg-amarillo/80 text-navy px-6 py-2.5 rounded-full font-bold shadow-lg shadow-amarillo/30 transition-all hover:shadow-amarillo/50 hover:scale-105">
                <a href="#contacto">Contáctanos</a>
              </Button>
            </div>

            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2" aria-label="Toggle menu">
              {isMobileMenuOpen
                ? <XIcon className={`w-6 h-6 ${isScrolled ? "text-navy" : "text-white"}`} />
                : <MenuIcon className={`w-6 h-6 ${isScrolled ? "text-navy" : "text-white"}`} />}
            </button>
          </nav>

          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-xl py-6 px-4 border-t animate-fade-up">
              <ul className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-navy/80 font-medium hover:text-celeste transition-colors">{link.label}</a>
                  </li>
                ))}
                <li>
                  <Button asChild className="w-full bg-amarillo text-navy rounded-full mt-2 font-bold">
                    <a href="#contacto" onClick={() => setIsMobileMenuOpen(false)}>Contáctanos</a>
                  </Button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </header>

      {/* ─── HERO ────────────────────────────────────── */}
      <section id="inicio" className="relative min-h-screen flex items-center hero-gradient overflow-hidden">
        {/* Animated background blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-celeste/20 rounded-full blur-3xl animate-pulse" style={{animationDuration:'4s'}} />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-celeste/10 rounded-full blur-3xl animate-pulse" style={{animationDuration:'6s',animationDelay:'1s'}} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/3 rounded-full blur-3xl" />
          {/* Rotating background icon */}
          <div className="absolute top-1/2 right-10 transform -translate-y-1/2 w-[600px] h-[600px] opacity-5 animate-slow-spin">
            <Image src="/images/logo.png" alt="" fill className="object-contain" />
          </div>
        </div>

        <div className="container mx-auto px-4 pt-24 pb-32 lg:pb-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div ref={heroContent.ref} className="text-center lg:text-left relative z-20">
              <div className={`inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20 ${heroContent.visible ? 'animate-fade-up' : 'opacity-0'}`}>
                <span className="w-2 h-2 bg-amarillo rounded-full ripple-dot" />
                <span className="text-white/80 text-sm font-medium">Sistema de Localización Escolar</span>
              </div>
              <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight ${heroContent.visible ? 'animate-fade-up delay-100' : 'opacity-0'}`}>
                Transporte Escolar
                <span className="block text-celeste">Seguro e Inteligente</span>
              </h1>
              <p className={`text-lg md:text-xl text-white/70 mb-8 max-w-xl mx-auto lg:mx-0 ${heroContent.visible ? 'animate-fade-up delay-200' : 'opacity-0'}`}>
                Tecnología avanzada para el seguimiento en tiempo real de autobuses escolares.
                Brindamos tranquilidad a padres y eficiencia a transportistas e instituciones educativas.
              </p>
              <div className={`flex flex-col sm:flex-row gap-4 justify-center lg:justify-start ${heroContent.visible ? 'animate-fade-up delay-300' : 'opacity-0'}`}>
                <Button asChild size="lg" className="bg-amarillo hover:bg-amarillo/80 text-navy px-8 py-6 rounded-full font-bold text-lg shadow-xl shadow-amarillo/30 transition-all hover:shadow-amarillo/50 hover:scale-105">
                  <a href="#contacto">
                    <MessageIcon className="w-5 h-5 mr-2" />
                    Solicitar Demo
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-2 border-white/30 text-white bg-white/5 hover:bg-white/15 px-8 py-6 rounded-full font-semibold text-lg backdrop-blur-sm transition-all hover:scale-105">
                  <a href="#nosotros">Conocer Más</a>
                </Button>
              </div>

              {/* Animated Stats */}
              <div className={`mt-12 grid grid-cols-3 gap-6 ${heroContent.visible ? 'animate-fade-up delay-400' : 'opacity-0'}`}>
                {[
                  { value: "+100", label: "Buses Monitoreados" },
                  { value: "+20", label: "Colegios" },
                  { value: "24/7", label: "Monitoreo" },
                ].map((s, i) => (
                  <div key={i} className="text-center group">
                    <div className="text-3xl md:text-4xl font-bold text-amarillo group-hover:scale-110 transition-transform duration-300">{s.value}</div>
                    <div className="text-white/50 text-sm mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Phone Mockup */}
            <div ref={heroPhone.ref} className={`relative hidden lg:block ${heroPhone.visible ? 'animate-fade-right' : 'opacity-0'}`}>
              <div className="relative z-10 animate-float">
                <div className="relative mx-auto w-[300px]">
                  <div className="bg-navy rounded-[3rem] p-3 shadow-2xl shadow-celeste/20 border border-white/10">
                    <div className="bg-white rounded-[2.5rem] overflow-hidden">
                      <div className="aspect-[9/19] bg-gradient-to-b from-celeste/10 to-white p-4">
                        <div className="flex justify-between items-center text-[10px] text-navy/40 mb-4">
                          <span className="font-semibold">9:41</span>
                          <div className="flex gap-1 items-center">
                            <div className="w-4 h-1.5 bg-navy/20 rounded-sm" />
                            <div className="w-1.5 h-1.5 bg-celeste rounded-full" />
                          </div>
                        </div>

                        {/* App header */}
                        <div className="bg-navy rounded-2xl p-3 mb-3 text-white flex items-center gap-3 shadow-md">
                          <div className="w-8 h-8 rounded-xl overflow-hidden">
                            <Image src="/images/logo.png" alt="Logo" width={32} height={32} className="object-cover" />
                          </div>
                          <div>
                            <div className="font-bold text-sm">Akiba Escolares</div>
                            <div className="text-[10px] text-white/60">Bus llega en 5 min</div>
                          </div>
                        </div>

                        {/* Animated route map */}
                        <div className="bg-celeste/10 rounded-2xl h-32 mb-3 relative overflow-hidden">
                          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 100">
                            <path className="route-line" d="M10 80 Q60 20 100 50 Q140 80 190 30" stroke="#0EA5E9" strokeWidth="2" fill="none" strokeLinecap="round" strokeDasharray="500" strokeDashoffset="500"/>
                            <circle cx="10" cy="80" r="4" fill="#EAB308" />
                            <circle cx="190" cy="30" r="4" fill="#0EA5E9" />
                          </svg>
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-bus-move">
                            <div className="w-8 h-8 bg-celeste rounded-full flex items-center justify-center shadow-lg shadow-celeste/40">
                              <BusIcon className="w-4 h-4 text-white" />
                            </div>
                          </div>
                          {/* Live dot */}
                          <div className="absolute top-2 right-2 flex items-center gap-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full ripple-dot" />
                            <span className="text-[8px] text-navy/60 font-bold">EN VIVO</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="bg-white rounded-xl p-2.5 shadow-sm border border-navy/5 flex items-center gap-3 hover:border-celeste/30 transition-colors">
                            <div className="w-9 h-9 bg-celeste/10 rounded-full flex items-center justify-center">
                              <UsersIcon className="w-4 h-4 text-celeste" />
                            </div>
                            <div>
                              <div className="text-[9px] text-navy/40 uppercase tracking-wide">Estudiante</div>
                              <div className="text-xs font-bold text-navy">Juan Pérez</div>
                            </div>
                          </div>
                          <div className="bg-white rounded-xl p-2.5 shadow-sm border border-navy/5 flex items-center gap-3">
                            <div className="w-9 h-9 bg-green-50 rounded-full flex items-center justify-center">
                              <CheckIcon className="w-4 h-4 text-green-500" />
                            </div>
                            <div>
                              <div className="text-[9px] text-navy/40 uppercase tracking-wide">Estado</div>
                              <div className="text-xs font-bold text-green-600">Abordó el bus ✓</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-celeste/20 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-navy/20 rounded-full blur-3xl pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* ─── ABOUT / FEATURES ────────────────────────── */}
      <section id="nosotros" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div ref={featuresSection.ref} className={`text-center max-w-3xl mx-auto mb-16 ${featuresSection.visible ? 'animate-fade-up' : 'opacity-0'}`}>
            <span className="text-celeste font-semibold text-sm uppercase tracking-wider">Sobre Nosotros</span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mt-3 mb-6">
              Tecnología al Servicio de la
              <span className="text-celeste"> Seguridad Escolar</span>
            </h2>
            <p className="text-lg text-navy/60">
              Hemos desarrollado nuestra propia tecnología para monitorear en vivo la ubicación de los estudiantes
              en cualquier recorrido. Nuestra app móvil permite a los padres saber
              el momento exacto en que sus hijos abordan y descienden del autobús.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className={`shimmer-card group hover:shadow-xl transition-all duration-300 border-0 shadow-md hover:-translate-y-3 cursor-default ${featuresSection.visible ? `animate-card-in delay-${(index + 1) * 100}` : 'opacity-0'}`}
              >
                <CardContent className="p-6">
                  <div className="w-14 h-14 bg-celeste/10 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-navy group-hover:scale-110 transition-all duration-300">
                    <feature.icon className="w-7 h-7 text-celeste group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg font-bold text-navy mb-3">{feature.title}</h3>
                  <p className="text-navy/55 text-sm leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Dashboard Preview */}
          <div ref={dashboardSection.ref} className={`mt-20 ${dashboardSection.visible ? 'animate-fade-up' : 'opacity-0'}`}>
            <div className="bg-gradient-to-br from-navy/5 to-celeste/5 rounded-3xl p-8 md:p-12">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className={`${dashboardSection.visible ? 'animate-fade-left' : 'opacity-0'}`}>
                  <h3 className="text-2xl md:text-3xl font-bold text-navy mb-4">Panel de Control Integral</h3>
                  <p className="text-navy/60 mb-6">
                    Administra toda tu flota de autobuses escolares desde un único dashboard.
                    Visualiza estadísticas, gestiona rutas y recibe alertas en tiempo real.
                  </p>
                  <ul className="space-y-3">
                    {["Monitoreo de flota completa", "Reportes detallados", "Alertas personalizables", "Historial de recorridos"].map((item, i) => (
                      <li key={i} className={`flex items-center gap-3 ${dashboardSection.visible ? `animate-fade-left delay-${(i + 1) * 100}` : 'opacity-0'}`}>
                        <div className="w-6 h-6 bg-celeste rounded-full flex items-center justify-center flex-shrink-0">
                          <CheckIcon className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-navy/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`relative ${dashboardSection.visible ? 'animate-fade-right' : 'opacity-0'}`}>
                  <div className="bg-white rounded-2xl shadow-2xl p-4 border border-navy/10 hover:shadow-celeste/10 hover:shadow-2xl transition-shadow duration-300">
                    <div className="aspect-video bg-navy/5 rounded-xl overflow-hidden">
                      <div className="h-full p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-400" />
                            <div className="w-3 h-3 rounded-full bg-amarillo" />
                            <div className="w-3 h-3 rounded-full bg-green-400" />
                          </div>
                          <div className="h-4 w-32 bg-navy/10 rounded" />
                        </div>
                        <div className="grid grid-cols-3 gap-3 mb-4">
                          {[
                            { label: "Buses Activos", value: "24", bg: "bg-navy", text: "text-white" },
                            { label: "En Ruta", value: "18", bg: "bg-celeste", text: "text-white" },
                            { label: "Estudiantes", value: "486", bg: "bg-amarillo", text: "text-navy" },
                          ].map((stat, i) => (
                            <div key={i} className={`${stat.bg} rounded-lg p-3 ${stat.text} transition-transform hover:scale-105 cursor-default`}>
                              <div className="text-[10px] opacity-70 font-medium">{stat.label}</div>
                              <div className="text-xl font-bold">{stat.value}</div>
                            </div>
                          ))}
                        </div>
                        <div className="bg-celeste/15 rounded-lg h-24 flex items-center justify-center relative overflow-hidden">
                          <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 300 80">
                            <path className="route-line" d="M10 60 Q80 10 150 40 Q220 70 290 20" stroke="#0EA5E9" strokeWidth="2" fill="none" strokeDasharray="500" strokeDashoffset="500"/>
                          </svg>
                          <MapPinIcon className="w-8 h-8 text-celeste" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── APP FEATURES ─────────────────────────────── */}
      <section id="app" className="py-20 bg-navy/5">
        <div ref={appSection.ref} className="container mx-auto px-4">
          <div className={`text-center max-w-3xl mx-auto mb-16 ${appSection.visible ? 'animate-fade-up' : 'opacity-0'}`}>
            <span className="text-celeste font-semibold text-sm uppercase tracking-wider">Nuestra App</span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mt-3 mb-6">
              Todo lo que Necesitas en
              <span className="text-celeste"> Una Aplicación</span>
            </h2>
            <p className="text-lg text-navy/60">
              Descubre todas las funcionalidades que nuestra app ofrece para mantener
              a tus hijos seguros y a ti informado.
            </p>
          </div>

          <div className={`max-w-3xl mx-auto ${appSection.visible ? 'animate-fade-up delay-200' : 'opacity-0'}`}>
            <Accordion type="single" collapsible className="space-y-4">
              {appFeatures.map((feature, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-white rounded-2xl shadow-md border-0 overflow-hidden shimmer-card"
                >
                  <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-celeste/5 transition-colors [&[data-state=open]]:bg-celeste/10 group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-celeste/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-navy group-hover:scale-110 transition-all duration-300">
                        <feature.icon className="w-6 h-6 text-celeste group-hover:text-white transition-colors duration-300" />
                      </div>
                      <span className="text-base font-semibold text-navy text-left">{feature.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-5 pt-0">
                    <div className="pl-16 text-navy/60 leading-relaxed">{feature.description}</div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* ─── TECHNOLOGY ────────────────────────────────── */}
      <section className="py-20 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-20 w-72 h-72 bg-celeste/10 rounded-full blur-3xl animate-pulse" style={{animationDuration:'5s'}} />
          <div className="absolute bottom-10 left-20 w-72 h-72 bg-amarillo/5 rounded-full blur-3xl animate-pulse" style={{animationDuration:'7s',animationDelay:'2s'}} />
        </div>

        <div ref={techSection.ref} className="container mx-auto px-4 relative z-10">
          <div className={`text-center max-w-3xl mx-auto mb-16 ${techSection.visible ? 'animate-fade-up' : 'opacity-0'}`}>
            <span className="text-celeste font-semibold text-sm uppercase tracking-wider">Tecnología</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-6">
              Seguridad y Eficiencia
              <span className="text-amarillo"> Garantizadas</span>
            </h2>
            <p className="text-lg text-white/50">
              Utilizamos las últimas tecnologías en seguridad informática para proteger la información de tu familia.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-center">
            <div className={`space-y-6 ${techSection.visible ? 'animate-fade-left' : 'opacity-0'}`}>
              {techFeatures.slice(0, 3).map((feature, index) => (
                <div key={index} className={`flex items-center gap-4 justify-end text-right group ${techSection.visible ? `animate-fade-left delay-${(index + 1) * 100}` : 'opacity-0'}`}>
                  <div>
                    <h4 className="text-white font-semibold group-hover:text-celeste transition-colors">{feature.title}</h4>
                    <p className="text-white/40 text-sm">{feature.description}</p>
                  </div>
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center shrink-0 border border-white/10 group-hover:bg-celeste/20 group-hover:border-celeste/30 transition-all duration-300">
                    <LockIcon className="w-5 h-5 text-celeste" />
                  </div>
                </div>
              ))}
            </div>

            <div className={`flex justify-center ${techSection.visible ? 'animate-fade-up delay-200' : 'opacity-0'}`}>
              <div className="relative">
                <div className="w-48 h-48 bg-gradient-to-br from-celeste to-navy rounded-3xl flex items-center justify-center shadow-2xl shadow-celeste/30 animate-pulse-glow">
                  <ShieldIcon className="w-24 h-24 text-white opacity-90" />
                </div>
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-navy rounded-2xl flex items-center justify-center border border-white/10 hover:border-celeste/40 transition-colors">
                  <CloudIcon className="w-8 h-8 text-amarillo" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-navy rounded-2xl flex items-center justify-center border border-white/10 hover:border-celeste/40 transition-colors">
                  <DatabaseIcon className="w-8 h-8 text-celeste" />
                </div>
              </div>
            </div>

            <div className={`space-y-6 ${techSection.visible ? 'animate-fade-right' : 'opacity-0'}`}>
              {techFeatures.slice(3).map((feature, index) => (
                <div key={index} className={`flex items-center gap-4 group ${techSection.visible ? `animate-fade-right delay-${(index + 1) * 100}` : 'opacity-0'}`}>
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center shrink-0 border border-white/10 group-hover:bg-celeste/20 group-hover:border-celeste/30 transition-all duration-300">
                    <LockIcon className="w-5 h-5 text-celeste" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold group-hover:text-celeste transition-colors">{feature.title}</h4>
                    <p className="text-white/40 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── BENEFITS ──────────────────────────────────── */}
      <section id="beneficios" className="py-20 bg-white">
        <div ref={benefitsSection.ref} className="container mx-auto px-4">
          <div className={`text-center max-w-3xl mx-auto mb-16 ${benefitsSection.visible ? 'animate-fade-up' : 'opacity-0'}`}>
            <span className="text-celeste font-semibold text-sm uppercase tracking-wider">Beneficios</span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mt-3 mb-6">
              Soluciones para <span className="text-celeste">Todos</span>
            </h2>
            <p className="text-lg text-navy/60">
              Nuestra plataforma está diseñada para beneficiar a todas las partes involucradas en el transporte escolar.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className={`shimmer-card group text-center hover:shadow-2xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-3 bg-gradient-to-b from-white to-celeste/5 ${benefitsSection.visible ? `animate-card-in delay-${(index + 1) * 100}` : 'opacity-0'}`}
              >
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-navy to-celeste rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-navy/20 group-hover:scale-110 group-hover:shadow-celeste/30 transition-all duration-300">
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-navy mb-3">{benefit.title}</h3>
                  <p className="text-navy/55 text-sm leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SGSL ──────────────────────────────────────── */}
      <section id="sgsl" className="py-20 bg-white border-t border-navy/5">
        <div ref={sgslSection.ref} className="container mx-auto px-4">
          <div className={`text-center max-w-4xl mx-auto mb-16 ${sgslSection.visible ? 'animate-fade-up' : 'opacity-0'}`}>
            <span className="text-celeste font-semibold text-sm uppercase tracking-wider">Gestión Legal y Prevención</span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mt-3 mb-6">
              Sistema de Gestión de Seguridad y <span className="text-celeste">Salud en el Trabajo</span>
            </h2>
            <p className="text-lg text-navy/60">
              No solo nos enfocamos en la seguridad de los niños, sino también en tu personal de trabajo.
              Cumplimos estrictamente el marco legal chileno para brindar la máxima tranquilidad.
            </p>
          </div>

          {/* Tarjetas Superiores */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            <Card className={`shimmer-card border-0 shadow-xl bg-gradient-to-br from-white to-navy/5 ${sgslSection.visible ? 'animate-fade-right delay-100' : 'opacity-0'}`}>
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-8 border-b border-navy/5 pb-4">
                  <div className="w-14 h-14 bg-navy rounded-2xl flex items-center justify-center shadow-lg shadow-navy/20">
                    <ScaleIcon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-navy">Marco Legal</h3>
                </div>
                <div className="space-y-5">
                  {legalFramework.map((item, i) => (
                    <div key={i} className="flex gap-4 group">
                      <div className="w-2.5 h-2.5 rounded-full bg-celeste mt-1.5 shrink-0 group-hover:scale-150 transition-transform" />
                      <div>
                        <strong className="text-navy block text-lg mb-1">{item.title}</strong>
                        <span className="text-navy/60 leading-snug block">{item.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className={`shimmer-card border-0 shadow-xl bg-gradient-to-bl from-white to-green-50/50 ${sgslSection.visible ? 'animate-fade-left delay-200' : 'opacity-0'}`}>
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-8 border-b border-navy/5 pb-4">
                  <div className="w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/20">
                    <CheckCircleIcon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-navy">Obligaciones Clave</h3>
                </div>
                <div className="space-y-6">
                  {sgslObligations.map((item, i) => (
                    <div key={i} className="flex gap-4 group">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-green-500 transition-colors">
                        <CheckIcon className="w-3.5 h-3.5 text-green-600 group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <strong className="text-navy block text-lg mb-1">{item.title}</strong>
                        <span className="text-navy/60 leading-snug block">{item.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Acordeón de Riesgos Críticos */}
          <div className={`max-w-5xl mx-auto ${sgslSection.visible ? 'animate-fade-up delay-300' : 'opacity-0'}`}>
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-navy inline-flex items-center gap-3">
                <ActivityIcon className="w-8 h-8 text-amarillo" />
                Control de Riesgos Críticos
              </h3>
            </div>
            
            <Accordion type="single" collapsible className="grid md:grid-cols-2 gap-4 items-start">
              {criticalRisks.map((risk, index) => (
                <AccordionItem
                  key={index}
                  value={`risk-${index}`}
                  className="bg-white rounded-2xl shadow-sm border border-navy/10 overflow-hidden col-span-1 shimmer-card"
                >
                  <AccordionTrigger className="px-5 py-5 hover:no-underline hover:bg-celeste/5 transition-colors [&[data-state=open]]:bg-celeste/10 group">
                    <div className="flex items-center gap-4 text-left">
                      <div className="w-12 h-12 bg-celeste/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-navy transition-all duration-300 group-hover:scale-110">
                        <risk.icon className="w-6 h-6 text-celeste group-hover:text-white" />
                      </div>
                      <span className="text-base font-bold text-navy">{risk.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-5 pb-5 pt-0">
                    <div className="pl-[4.2rem] text-navy/65 leading-relaxed text-[15px] pr-4">{risk.desc}</div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* ─── CONTACT ───────────────────────────────────── */}
      <section id="contacto" className="py-20 bg-navy/5">
        <div ref={contactSection.ref} className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              <div className={`${contactSection.visible ? 'animate-fade-left' : 'opacity-0'}`}>
                <span className="text-celeste font-semibold text-sm uppercase tracking-wider">Contacto</span>
                <h2 className="text-3xl md:text-4xl font-bold text-navy mt-3 mb-6">
                  Solicita más <span className="text-celeste">Información</span>
                </h2>
                <p className="text-navy/60 mb-8">
                  Completa el formulario y nos pondremos en contacto contigo lo antes posible para resolver todas tus dudas.
                </p>

                {/* Success message */}
                {formStatus === "success" && (
                  <div className="bg-green-50 border border-green-200 rounded-2xl p-6 flex items-start gap-4 animate-fade-up">
                    <CheckCircleIcon className="w-8 h-8 text-green-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-green-800 text-lg">¡Mensaje enviado!</h4>
                      <p className="text-green-700 text-sm mt-1">Gracias por contactarnos. Te responderemos a la brevedad en <strong>contacto@akibaescolares.cl</strong>.</p>
                      <button onClick={() => setFormStatus("idle")} className="mt-3 text-sm text-green-600 underline hover:text-green-800 transition-colors">Enviar otro mensaje</button>
                    </div>
                  </div>
                )}

                {/* Error message */}
                {formStatus === "error" && (
                  <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center gap-3 animate-fade-up">
                    <AlertCircleIcon className="w-6 h-6 text-red-500 shrink-0" />
                    <p className="text-red-700 text-sm">Hubo un problema al enviar. Por favor escríbenos directamente a <a href="mailto:contacto@akibaescolares.cl" className="underline font-medium">contacto@akibaescolares.cl</a></p>
                  </div>
                )}

                {formStatus !== "success" && (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-navy/70 mb-2">Nombre *</label>
                      <Input id="name" type="text" placeholder="Tu nombre" required value={formData.name} onChange={handleInputChange} className="bg-white border-navy/10 focus:border-celeste rounded-xl py-3" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-navy/70 mb-2">Correo electrónico *</label>
                      <Input id="email" type="email" placeholder="tu@email.com" required value={formData.email} onChange={handleInputChange} className="bg-white border-navy/10 focus:border-celeste rounded-xl py-3" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-navy/70 mb-2">Teléfono</label>
                    <Input id="phone" type="tel" placeholder="+56 9 1234 5678" value={formData.phone} onChange={handleInputChange} className="bg-white border-navy/10 focus:border-celeste rounded-xl py-3" />
                  </div>
                  <div>
                    <label htmlFor="institution" className="block text-sm font-medium text-navy/70 mb-2">Institución</label>
                    <Input id="institution" type="text" placeholder="Nombre del colegio o institución" value={formData.institution} onChange={handleInputChange} className="bg-white border-navy/10 focus:border-celeste rounded-xl py-3" />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-navy/70 mb-2">Mensaje</label>
                    <Textarea id="message" rows={4} placeholder="Cuéntanos cómo podemos ayudarte..." value={formData.message} onChange={handleInputChange} className="bg-white border-navy/10 focus:border-celeste rounded-xl resize-none" />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    disabled={formStatus === "sending"}
                    className="w-full bg-amarillo hover:bg-amarillo/80 text-navy rounded-xl py-4 font-bold text-lg shadow-lg shadow-amarillo/30 transition-all hover:shadow-amarillo/50 hover:scale-[1.02] disabled:opacity-70 disabled:scale-100"
                  >
                    {formStatus === "sending" ? (
                      <><span className="animate-spin mr-2 inline-block w-5 h-5 border-2 border-navy border-t-transparent rounded-full" />Enviando...</>
                    ) : (
                      <><SendIcon className="w-5 h-5 mr-2" />Enviar Mensaje</>
                    )}
                  </Button>
                </form>
                )}
              </div>

              <div className={`lg:pl-12 ${contactSection.visible ? 'animate-fade-right' : 'opacity-0'}`}>
                <div className="bg-gradient-to-br from-navy to-navy/90 rounded-3xl p-8 md:p-10 text-white h-full relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-celeste/20 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-amarillo/10 rounded-full blur-3xl pointer-events-none" />

                  <h3 className="text-2xl font-bold mb-6 relative z-10">También puedes contactarnos en:</h3>

                  <div className="space-y-6 mb-10 relative z-10">
                    {[
                      { icon: MailIcon, label: "Email", value: "contacto@akibaescolares.cl", href: "mailto:contacto@akibaescolares.cl" },
                      { icon: PhoneIcon, label: "Sitio Web", value: "akibaescolares.cl", href: "https://akibaescolares.cl" },
                      { icon: MapPinIcon, label: "Dirección", value: "Viña del Mar, Chile", href: "#" },
                    ].map((c, i) => (
                      <div key={i} className="flex items-start gap-4 group">
                        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-celeste/30 transition-colors duration-300">
                          <c.icon className="w-5 h-5 text-celeste" />
                        </div>
                        <div>
                          <div className="text-white/40 text-xs mb-1 uppercase tracking-wide">{c.label}</div>
                          <a href={c.href} className="text-base font-medium hover:text-celeste transition-colors">{c.value}</a>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-white/10 pt-8 relative z-10">
                    <h4 className="font-semibold mb-4 text-white/80">Descarga nuestra app:</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" className="bg-white/5 border-white/10 text-white hover:bg-white/15 rounded-xl h-12 transition-all hover:scale-105">
                        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                        </svg>
                        App Store
                      </Button>
                      <Button variant="outline" className="bg-white/5 border-white/10 text-white hover:bg-white/15 rounded-xl h-12 transition-all hover:scale-105">
                        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
                        </svg>
                        Play Store
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ────────────────────────────────────── */}
      <footer className="bg-navy text-white py-12 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden shadow-md shadow-celeste/20">
                <Image src="/images/logo.png" alt="Akiba Escolares" width={40} height={40} className="object-cover" />
              </div>
              <span className="text-xl font-bold">
                Akiba <span className="text-amarillo">Escolares</span>
              </span>
            </div>

            <div className="flex flex-wrap justify-center gap-8 text-sm text-white/50">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="hover:text-celeste transition-colors">{link.label}</a>
              ))}
              <a href="#" className="hover:text-celeste transition-colors">Privacidad</a>
            </div>

            <div className="text-sm text-white/30">
              © {new Date().getFullYear()} Akiba Escolares. Todos los derechos reservados.
            </div>
          </div>
        </div>
      </footer>
      {/* ─── WHATSAPP FLOATING BUTTON ────────────────── */}
      <div className="fixed bottom-6 right-6 z-50 animate-fade-up delay-700">
        <a 
          href="https://wa.me/56950359537?text=Hola,%20me%20gustar%C3%ADa%20solicitar%20informaci%C3%B3n%20sobre%20Akiba%20Escolares" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center w-[60px] h-[60px] bg-[#25D366] text-white rounded-full shadow-[0_10px_25px_rgba(37,211,102,0.4)] hover:bg-[#1ebd5a] transition-all duration-300 hover:-translate-y-2"
          aria-label="Contactar por WhatsApp"
        >
          {/* Continuous subtle pulse ring behind */}
          <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-30 animate-ping" style={{ animationDuration: '3s' }}></span>
          
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-8 h-8 relative z-10 group-hover:scale-110 transition-transform duration-300"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
          </svg>
        </a>
      </div>
    </main>
  );
}
