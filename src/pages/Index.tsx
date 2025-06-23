
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, FileText, Send, Zap, Users, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">Proposta Rápida</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#funcionalidades" className="text-gray-600 hover:text-primary transition-colors">
                Funcionalidades
              </a>
              <a href="#planos" className="text-gray-600 hover:text-primary transition-colors">
                Planos
              </a>
              <Link to="/login" className="text-gray-600 hover:text-primary transition-colors">
                Entrar
              </Link>
              <Link to="/register">
                <Button>Começar Grátis</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
            Crie propostas
            <span className="text-primary block">profissionais em minutos</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Transforme seu tempo em resultados. Crie, envie e aprove propostas comerciais 
            de forma simples e profissional. Ideal para freelancers, consultores e MEIs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="text-lg px-8 py-4">
                <Zap className="w-5 h-5 mr-2" />
                Criar Primeira Proposta
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4">
              Ver Demonstração
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-4">✨ Grátis para começar • Sem cartão de crédito</p>
        </div>
      </section>

      {/* Features Section */}
      <section id="funcionalidades" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Tudo que você precisa para impressionar seus clientes
            </h2>
            <p className="text-xl text-gray-600">
              Ferramentas profissionais que fazem a diferença na sua apresentação
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <FileText className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Formulário Inteligente</CardTitle>
                <CardDescription>
                  Wizard passo a passo que guia você na criação da proposta perfeita
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Send className="w-12 h-12 text-accent mb-4" />
                <CardTitle>Compartilhamento Fácil</CardTitle>
                <CardDescription>
                  Gere PDFs profissionais e links compartilháveis com aprovação via WhatsApp
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Users className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Gestão Completa</CardTitle>
                <CardDescription>
                  Acompanhe todas suas propostas, status e histórico em um só lugar
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="planos" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Escolha o plano ideal para você
            </h2>
            <p className="text-xl text-gray-600">
              Comece grátis e evolua conforme sua necessidade
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-2 border-gray-200">
              <CardHeader>
                <CardTitle className="text-2xl">Gratuito</CardTitle>
                <CardDescription>Perfeito para começar</CardDescription>
                <div className="text-3xl font-bold">R$ 0<span className="text-lg text-gray-500">/mês</span></div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    Até 3 propostas por mês
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    PDFs com marca d'água
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    Links compartilháveis
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    Integração WhatsApp
                  </li>
                </ul>
                <Link to="/register" className="block mt-6">
                  <Button className="w-full" variant="outline">Começar Grátis</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary shadow-lg relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-accent text-white px-4 py-1 rounded-full text-sm font-medium">
                  Mais Popular
                </span>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">Premium</CardTitle>
                <CardDescription>Para profissionais sérios</CardDescription>
                <div className="text-3xl font-bold">R$ 29<span className="text-lg text-gray-500">/mês</span></div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    Propostas ilimitadas
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    PDFs sem marca d'água
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    Subdomínio personalizado
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    Modelos prontos
                  </li>
                  <li className="flex items-center">
                    <Shield className="w-5 h-5 text-green-500 mr-2" />
                    Suporte prioritário
                  </li>
                </ul>
                <Link to="/register" className="block mt-6">
                  <Button className="w-full">Upgrade Premium</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Proposta Rápida</span>
            </div>
            <div className="text-gray-400">
              © 2024 Proposta Rápida. Todos os direitos reservados.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
