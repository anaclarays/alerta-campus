import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { centrosAcademicos } from '@/data/ufpeLocations';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const RegisterUFPE: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    gender: '',
    address: '',
    matricula: '',
    phone: '',
    cpf: '',
    email: '',
    centro: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    const requiredFields = ['name', 'birthDate', 'gender', 'address', 'matricula', 'phone', 'cpf', 'email', 'centro'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);

    if (missingFields.length > 0) {
      toast({
        title: 'Campos obrigatórios',
        description: 'Preencha todos os campos para continuar',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      await register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        cpf: formData.cpf,
        birthDate: formData.birthDate,
        gender: formData.gender,
        address: formData.address,
        isUFPE: true,
        matricula: formData.matricula,
        centro: formData.centro,
      });
      toast({
        title: 'Cadastro realizado!',
        description: 'Sua conta foi criada com sucesso',
      });
      navigate('/login');
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Falha ao realizar cadastro',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setShowCancelDialog(true);
  };

  const confirmCancel = () => {
    setShowCancelDialog(false);
    navigate('/register-type');
  };

  return (
    <div className="mobile-container flex flex-col min-h-screen bg-background">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border p-4">
        <div className="flex items-center gap-3">
          <button
            onClick={handleCancel}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold">Cadastro UFPE</h1>
        </div>
      </div>

      <div className="flex-1 overflow-auto px-4 py-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Nome completo *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Digite seu nome completo"
              className="mt-1.5"
            />
          </div>

          <div>
            <Label htmlFor="birthDate">Data de nascimento *</Label>
            <Input
              id="birthDate"
              type="date"
              value={formData.birthDate}
              onChange={(e) => handleChange('birthDate', e.target.value)}
              className="mt-1.5"
            />
          </div>

          <div>
            <Label>Gênero *</Label>
            <Select value={formData.gender} onValueChange={(value) => handleChange('gender', value)}>
              <SelectTrigger className="mt-1.5">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="feminino">Feminino</SelectItem>
                <SelectItem value="masculino">Masculino</SelectItem>
                <SelectItem value="outro">Outro</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="address">Endereço completo *</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => handleChange('address', e.target.value)}
              placeholder="Rua, número, bairro, cidade"
              className="mt-1.5"
            />
          </div>

          <div>
            <Label htmlFor="matricula">Matrícula UFPE (será sua senha) *</Label>
            <Input
              id="matricula"
              value={formData.matricula}
              onChange={(e) => handleChange('matricula', e.target.value)}
              placeholder="Digite sua matrícula"
              className="mt-1.5"
            />
          </div>

          <div>
            <Label htmlFor="phone">Telefone *</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="(81) 99999-9999"
              className="mt-1.5"
            />
          </div>

          <div>
            <Label htmlFor="cpf">CPF *</Label>
            <Input
              id="cpf"
              value={formData.cpf}
              onChange={(e) => handleChange('cpf', e.target.value)}
              placeholder="000.000.000-00"
              className="mt-1.5"
            />
          </div>

          <div>
            <Label htmlFor="email">E-mail *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="seu@email.com"
              className="mt-1.5"
            />
          </div>

          <div>
            <Label>Centro Acadêmico *</Label>
            <Select value={formData.centro} onValueChange={(value) => handleChange('centro', value)}>
              <SelectTrigger className="mt-1.5">
                <SelectValue placeholder="Selecione o centro" />
              </SelectTrigger>
              <SelectContent>
                {centrosAcademicos.map((centro) => (
                  <SelectItem key={centro} value={centro}>
                    {centro}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 bg-background/95 backdrop-blur-sm border-t border-border p-4 safe-area-bottom">
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button variant="gradient" className="flex-1" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Cadastrando...' : 'Confirmar'}
          </Button>
        </div>
      </div>

      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent className="max-w-sm w-[calc(100%-2rem)]">
          <DialogHeader>
            <DialogTitle>Cadastro incompleto!</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja cancelar?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-row gap-3">
            <Button variant="outline" className="flex-1" onClick={() => setShowCancelDialog(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" className="flex-1" onClick={confirmCancel}>
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RegisterUFPE;
