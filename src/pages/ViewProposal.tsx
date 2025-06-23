
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  FileText, 
  Download, 
  MessageCircle, 
  Calendar, 
  DollarSign, 
  CheckCircle,
  Clock,
  User,
  Briefcase,
  ArrowLeft
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const ViewProposal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isAccepted, setIsAccepted] = useState(false);
  const [proposal, setProposal] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [generatingPDF, setGeneratingPDF] = useState(false);
  const pdfRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Busca a proposta no localStorage
    const savedProposals = JSON.parse(localStorage.getItem('proposals') || '[]');
    const foundProposal = savedProposals.find((p: any) => p.id === id);
    
    if (foundProposal) {
      // Converte os dados para o formato esperado
      const formattedProposal = {
        id: foundProposal.id,
        title: foundProposal.serviceTitle || "Proposta de Serviço",
        client: {
          name: foundProposal.clientName,
          company: foundProposal.clientCompany,
          email: foundProposal.clientEmail,
          phone: foundProposal.clientPhone
        },
        provider: foundProposal.provider,
        service: {
          title: foundProposal.serviceTitle,
          description: foundProposal.serviceDescription
        },
        pricing: {
          totalValue: parseFloat(foundProposal.totalValue) || 0,
          installments: parseInt(foundProposal.installments) || 1,
          paymentMethod: foundProposal.paymentMethod?.toUpperCase() || "PIX",
          installmentValue: (parseFloat(foundProposal.totalValue) || 0) / (parseInt(foundProposal.installments) || 1)
        },
        timeline: {
          deliveryDays: parseInt(foundProposal.deliveryDays) || 0,
          startDate: foundProposal.startDate || new Date().toISOString().split('T')[0]
        },
        conditions: foundProposal.conditions || "Não especificado",
        warranty: foundProposal.warranty || "30 dias",
        observations: foundProposal.observations || "",
        createdAt: foundProposal.createdAt || new Date().toISOString(),
        validUntil: foundProposal.validUntil || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      };
      
      setProposal(formattedProposal);
    } else {
      // Se não encontrar a proposta, usa dados mockados
      setProposal({
        id: id,
        title: "Website Institucional - Empresa ABC",
        client: {
          name: "João Silva",
          company: "Empresa ABC Ltda",
          email: "joao@empresa.com",
          phone: "(11) 99999-9999"
        },
        provider: {
          name: "Maria Designer",
          email: "maria@designer.com",
          phone: "(11) 88888-8888",
          logo: null
        },
        service: {
          title: "Criação de Website Institucional Responsivo",
          description: `Desenvolvimento completo de website institucional responsivo com as seguintes características:

• Design moderno e profissional
• Layout responsivo (mobile, tablet, desktop)
• 5 páginas principais (Home, Sobre, Serviços, Portfolio, Contato)
• Integração com formulário de contato
• Otimização para SEO básico
• Painel administrativo para edição de conteúdo
• Hospedagem por 12 meses incluída
• SSL/certificado de segurança
• Treinamento para uso do painel

O site será desenvolvido utilizando as melhores práticas de desenvolvimento web, garantindo velocidade de carregamento e uma experiência de usuário excepcional.`
        },
        pricing: {
          totalValue: 2500,
          installments: 2,
          paymentMethod: "PIX",
          installmentValue: 1250
        },
        timeline: {
          deliveryDays: 15,
          startDate: "2024-02-01"
        },
        conditions: `• Aprovação do briefing antes do início dos trabalhos
• 50% do valor no início, 50% na entrega
• Prazo de entrega sujeito à aprovação de materiais
• Revisões: até 3 rodadas de ajustes incluídas
• Conteúdo (textos e imagens) por conta do cliente
• Garantia de 30 dias para correções`,
        warranty: "30 dias",
        observations: "Agradecemos a oportunidade de apresentar esta proposta. Estamos à disposição para esclarecimentos e ansiosos para dar vida ao seu projeto!",
        createdAt: "2024-01-15",
        validUntil: "2024-02-15"
      });
    }
    
    setLoading(false);
  }, [id]);

  const handleWhatsAppAccept = () => {
    if (!proposal) return;
    const message = `Olá! Gostaria de *ACEITAR* a proposta "${proposal.title}" no valor de R$ ${proposal.pricing.totalValue.toLocaleString()}. Podemos prosseguir?`;
    const phone = proposal.provider.phone.replace(/\D/g, '');
    const whatsappUrl = `https://wa.me/55${phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setIsAccepted(true);
  };

  const handleWhatsAppReject = () => {
    if (!proposal) return;
    const message = `Olá! Analisei a proposta "${proposal.title}" mas infelizmente não poderemos prosseguir neste momento. Obrigado pela atenção!`;
    const phone = proposal.provider.phone.replace(/\D/g, '');
    const whatsappUrl = `https://wa.me/55${phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleDownloadPDF = async () => {
    if (!pdfRef.current || !proposal) return;
    
    setGeneratingPDF(true);
    
    try {
      // Configurações do canvas para melhor qualidade
      const canvas = await html2canvas(pdfRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      // Dimensões da página A4
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      // Calcular dimensões da imagem para caber na página
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;
      
      // Se a imagem for maior que a página, adicionar múltiplas páginas
      let heightLeft = imgHeight;
      let position = 0;
      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }
      
      // Salvar o PDF
      const fileName = `proposta-${proposal.client.name.replace(/\s+/g, '-').toLowerCase()}-${id}.pdf`;
      pdf.save(fileName);
      
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      alert('Erro ao gerar PDF. Tente novamente.');
    } finally {
      setGeneratingPDF(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando proposta...</p>
        </div>
      </div>
    );
  }

  if (!proposal) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Proposta não encontrada</h1>
          <Button onClick={() => navigate('/dashboard')}>
            Voltar ao Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/dashboard')}
                className="mr-2"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Proposta Comercial</h1>
                <p className="text-gray-600">#{proposal.id}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline">
                <Clock className="w-3 h-3 mr-1" />
                Válida até {new Date(proposal.validUntil).toLocaleDateString('pt-BR')}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Status Alert */}
        {isAccepted && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="font-medium text-green-800">Proposta aceita!</span>
            </div>
            <p className="text-green-700 text-sm mt-1">
              Obrigado por aceitar nossa proposta. Entraremos em contato em breve!
            </p>
          </div>
        )}

        {/* PDF Content - This will be captured for PDF generation */}
        <div ref={pdfRef} className="bg-white p-8 rounded-lg shadow-sm mb-8">
          {/* PDF Header with Logo */}
          <div className="flex items-center justify-between mb-8 pb-6 border-b">
            <div className="flex items-center space-x-4">
              {proposal.provider.logo && (
                <img 
                  src={proposal.provider.logo} 
                  alt="Logo da empresa" 
                  className="w-16 h-16 object-contain"
                />
              )}
              <div>
                <h1 className="text-3xl font-bold text-gray-900">PROPOSTA COMERCIAL</h1>
                <p className="text-gray-600">#{proposal.id}</p>
              </div>
            </div>
            <div className="text-right text-sm text-gray-600">
              <p>Criada em: {new Date(proposal.createdAt).toLocaleDateString('pt-BR')}</p>
              <p>Válida até: {new Date(proposal.validUntil).toLocaleDateString('pt-BR')}</p>
            </div>
          </div>

          {/* Client & Provider Info */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="flex items-center font-semibold text-gray-900 mb-4">
                <User className="w-5 h-5 text-primary mr-2" />
                DADOS DO CLIENTE
              </h3>
              <div className="space-y-2 text-sm">
                <p className="font-medium text-lg">{proposal.client.name}</p>
                {proposal.client.company && (
                  <p className="text-gray-700">{proposal.client.company}</p>
                )}
                <p className="text-gray-700">{proposal.client.email}</p>
                <p className="text-gray-700">{proposal.client.phone}</p>
              </div>
            </div>

            <div>
              <h3 className="flex items-center font-semibold text-gray-900 mb-4">
                <Briefcase className="w-5 h-5 text-primary mr-2" />
                PRESTADOR DE SERVIÇO
              </h3>
              <div className="space-y-2 text-sm">
                <p className="font-medium text-lg">{proposal.provider.name}</p>
                <p className="text-gray-700">{proposal.provider.email}</p>
                <p className="text-gray-700">{proposal.provider.phone}</p>
              </div>
            </div>
          </div>

          {/* Service Description */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{proposal.service.title}</h3>
            <div className="prose prose-sm max-w-none">
              <div className="whitespace-pre-line text-gray-700 leading-relaxed text-base">
                {proposal.service.description}
              </div>
            </div>
          </div>

          {/* Pricing & Timeline */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-primary/5 p-6 rounded-lg">
              <h3 className="flex items-center font-semibold text-gray-900 mb-4">
                <DollarSign className="w-5 h-5 text-primary mr-2" />
                INVESTIMENTO
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-3xl font-bold text-primary">
                    R$ {proposal.pricing.totalValue.toLocaleString()}
                  </p>
                  <p className="text-gray-600">Valor total</p>
                </div>
                <div className="border-t pt-3 space-y-1">
                  <p>
                    <span className="font-medium">Parcelas:</span>{" "}
                    {proposal.pricing.installments}x de R$ {proposal.pricing.installmentValue.toLocaleString()}
                  </p>
                  <p>
                    <span className="font-medium">Forma de pagamento:</span>{" "}
                    {proposal.pricing.paymentMethod}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="flex items-center font-semibold text-gray-900 mb-4">
                <Calendar className="w-5 h-5 text-primary mr-2" />
                CRONOGRAMA
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-gray-900">Prazo de entrega</p>
                  <p className="text-gray-700 text-lg">{proposal.timeline.deliveryDays} dias úteis</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Início previsto</p>
                  <p className="text-gray-700">
                    {new Date(proposal.timeline.startDate).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Garantia</p>
                  <p className="text-gray-700">{proposal.warranty}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Conditions */}
          <div className="mb-8">
            <h3 className="font-semibold text-gray-900 mb-4 text-xl">CONDIÇÕES GERAIS</h3>
            <div className="whitespace-pre-line text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">
              {proposal.conditions}
            </div>
          </div>

          {/* Observations */}
          {proposal.observations && (
            <div className="mb-8">
              <h3 className="font-semibold text-gray-900 mb-4 text-xl">OBSERVAÇÕES</h3>
              <div className="text-gray-700 leading-relaxed bg-blue-50 p-4 rounded-lg">
                {proposal.observations}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="text-center pt-8 border-t">
            <div className="flex items-center justify-center space-x-2 text-gray-400">
              <div className="w-6 h-6 bg-gray-300 rounded flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
              <span className="text-sm">Criado com Proposta Rápida</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4 text-center">
              Gostou da proposta?
            </h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={handleWhatsAppAccept}
                className="flex-1 bg-green-600 hover:bg-green-700"
                size="lg"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Aceitar via WhatsApp
              </Button>
              <Button 
                onClick={handleDownloadPDF}
                variant="outline"
                size="lg"
                className="flex-1"
                disabled={generatingPDF}
              >
                <Download className="w-5 h-5 mr-2" />
                {generatingPDF ? 'Gerando PDF...' : 'Baixar PDF'}
              </Button>
              <Button 
                onClick={handleWhatsAppReject}
                variant="outline"
                size="lg"
                className="flex-1 text-red-600 border-red-200 hover:bg-red-50"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Não tenho interesse
              </Button>
            </div>
            
            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500">
                Proposta válida até {new Date(proposal.validUntil).toLocaleDateString('pt-BR')} • 
                Criada em {new Date(proposal.createdAt).toLocaleDateString('pt-BR')}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ViewProposal;
