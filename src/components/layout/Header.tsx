import { useNavigate, useLocation } from 'react-router-dom';
import { Logo } from '../Logo';
import { IconButton } from '../ui';
import { Menu, X, User, Settings, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = user
    ? [
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Trilhas', path: '/trilhas' },
        { name: 'Metas', path: '/metas' },
        { name: 'Hábitos', path: '/habitos' },
        { name: 'Progresso', path: '/progresso' },
      ]
    : [];

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 bg-dark/95 backdrop-blur-lg border-b border-titanium/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div
            className="cursor-pointer"
            onClick={() => navigate(user ? '/dashboard' : '/')}
          >
            <Logo size="md" />
          </div>

          <nav className="hidden md:flex items-center gap-6">
            {navigation.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`
                  text-sm font-medium transition-all duration-300
                  ${
                    isActive(item.path)
                      ? 'text-primary'
                      : 'text-soft-white hover:text-primary'
                  }
                `}
              >
                {item.name}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <>
                <IconButton
                  icon={<User size={20} />}
                  label="Perfil"
                  onClick={() => navigate('/perfil')}
                />
                <IconButton
                  icon={<Settings size={20} />}
                  label="Configurações"
                  onClick={() => navigate('/configuracoes')}
                />
                <IconButton
                  icon={<LogOut size={20} />}
                  label="Sair"
                  onClick={handleSignOut}
                />
              </>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="px-6 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all font-semibold"
              >
                Entrar
              </button>
            )}
          </div>

          <IconButton
            icon={mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            label="Menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden"
          />
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-titanium/20 pt-4 animate-slideIn">
            <nav className="flex flex-col gap-3">
              {navigation.map((item) => (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setMobileMenuOpen(false);
                  }}
                  className={`
                    text-left px-4 py-3 rounded-xl transition-all
                    ${
                      isActive(item.path)
                        ? 'bg-primary/20 text-primary'
                        : 'text-soft-white hover:bg-titanium/20'
                    }
                  `}
                >
                  {item.name}
                </button>
              ))}

              {user && (
                <>
                  <button
                    onClick={() => {
                      navigate('/perfil');
                      setMobileMenuOpen(false);
                    }}
                    className="text-left px-4 py-3 rounded-xl text-soft-white hover:bg-titanium/20 transition-all"
                  >
                    Perfil
                  </button>
                  <button
                    onClick={() => {
                      navigate('/configuracoes');
                      setMobileMenuOpen(false);
                    }}
                    className="text-left px-4 py-3 rounded-xl text-soft-white hover:bg-titanium/20 transition-all"
                  >
                    Configurações
                  </button>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setMobileMenuOpen(false);
                    }}
                    className="text-left px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all"
                  >
                    Sair
                  </button>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
