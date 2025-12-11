import { Heart, Github, Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-lighter border-t border-titanium/20 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold text-soft-white mb-3">
              Mentes.ia
            </h3>
            <p className="text-sm text-soft-muted leading-relaxed">
              Transforme sua mente, transforme sua vida. Desenvolvimento mental
              e espiritual com inteligência artificial.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-soft-white mb-3">Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/sobre"
                  className="text-sm text-soft-muted hover:text-primary transition-colors"
                >
                  Sobre nós
                </a>
              </li>
              <li>
                <a
                  href="/ajuda"
                  className="text-sm text-soft-muted hover:text-primary transition-colors"
                >
                  Central de Ajuda
                </a>
              </li>
              <li>
                <a
                  href="/privacidade"
                  className="text-sm text-soft-muted hover:text-primary transition-colors"
                >
                  Privacidade
                </a>
              </li>
              <li>
                <a
                  href="/termos"
                  className="text-sm text-soft-muted hover:text-primary transition-colors"
                >
                  Termos de Uso
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-soft-white mb-3">Contato</h3>
            <div className="flex gap-4">
              <a
                href="https://github.com/filipedalago-hub/Mentes.ia"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-titanium/20 rounded-lg hover:bg-primary/20 hover:text-primary transition-all"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="mailto:contato@mentes.ia"
                className="p-2 bg-titanium/20 rounded-lg hover:bg-primary/20 hover:text-primary transition-all"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-titanium/20 text-center">
          <p className="text-sm text-soft-muted flex items-center justify-center gap-2">
            Feito com <Heart size={16} className="text-primary" /> por{' '}
            <span className="text-primary font-semibold">Mentes.ia Team</span>
          </p>
          <p className="text-xs text-soft-muted mt-2">
            © {currentYear} Mentes.ia. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
