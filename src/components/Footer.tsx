import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Facebook, Instagram, Twitter, Youtube, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  setCurrentView: (view: string) => void;
}

const Footer: React.FC<FooterProps> = ({ setCurrentView }) => {
  const handleNavClick = (view: string) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { name: 'Home', view: 'home' },
    { name: 'New Cars', view: 'new' },
    { name: 'Used Cars', view: 'used' },
    { name: 'Rentals', view: 'rentals' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Cookie Policy', href: '#' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Youtube, href: '#', label: 'Youtube' },
  ];

  return (
    <footer className="bg-[#0a0a0c] border-t border-white/5">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <button
                onClick={() => handleNavClick('home')}
                className="flex items-center gap-3 mb-6 group"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all duration-300">
                  <span className="text-white font-bold text-xl">C</span>
                </div>
                <div>
                  <span className="text-white text-xl font-semibold tracking-tight block">CARCIAN</span>
                  <span className="text-[10px] text-white/40 tracking-[0.2em] uppercase">Bangladesh</span>
                </div>
              </button>
              <p className="text-white/40 text-sm leading-relaxed mb-6">
                Bangladesh's premier destination for luxury automobiles. Experience automotive excellence with our curated collection.
              </p>
              {/* Social Links */}
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-all duration-300"
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-white font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-4">
                {quickLinks.map((link) => (
                  <li key={link.view}>
                    <button
                      onClick={() => handleNavClick(link.view)}
                      className="group flex items-center gap-2 text-white/50 hover:text-blue-400 transition-colors text-sm"
                    >
                      <span>{link.name}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Contact Us */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-white font-semibold mb-6">Contact Us</h3>
              <ul className="space-y-4">
                <li>
                  <a
                    href="#"
                    className="flex items-start gap-3 text-white/50 hover:text-white transition-colors text-sm"
                  >
                    <MapPin className="w-4 h-4 mt-0.5 text-blue-400 flex-shrink-0" />
                    <span>123 Gulshan Avenue, Gulshan-2, Dhaka 1212, Bangladesh</span>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:info@carcian.com"
                    className="flex items-center gap-3 text-white/50 hover:text-white transition-colors text-sm"
                  >
                    <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    <span>info@carcian.com</span>
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+8801700000000"
                    className="flex items-center gap-3 text-white/50 hover:text-white transition-colors text-sm"
                  >
                    <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    <span>+880 1700 000 000</span>
                  </a>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Legal */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-white font-semibold mb-6">Legal</h3>
              <ul className="space-y-4">
                {legalLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-white/50 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/30 text-sm">
              © {new Date().getFullYear()} Carcian. All rights reserved.
            </p>
            <p className="text-white/30 text-sm">
              Made with ❤️ in Bangladesh
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
