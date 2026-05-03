import { useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useVibeTheme } from "@/hooks/useVibeTheme";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle2, LockKeyhole, Mail } from "lucide-react";

export default function Account() {
  const [email, setEmail] = useLocalStorage("account_email", "");
  const [password, setPassword] = useLocalStorage("account_password", "");
  const [emailInput, setEmailInput] = useState(email);
  const [passwordInput, setPasswordInput] = useState(password);
  const [saved, setSaved] = useState(false);
  const t = useVibeTheme();

  const handleSave = () => {
    setEmail(emailInput.trim());
    setPassword(passwordInput);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="w-full" style={{ background: t.pageBg }}>
      <div className="container mx-auto p-4 md:p-8 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 rounded-3xl shadow-sm"
          style={{ background: t.cardBg, border: `1.5px solid ${t.cardBorder}` }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{ background: `${t.accent}18` }}>
              <LockKeyhole className="w-5 h-5" style={{ color: t.accent }} />
            </div>
            <div>
              <h1 className="text-3xl font-serif font-bold" style={{ color: t.text }}>Account</h1>
              <p className="text-sm" style={{ color: t.subtext }}>save your login so your data feels safer</p>
            </div>
          </div>

          <div className="mt-8 space-y-5">
            <label className="block">
              <span className="mb-2 block text-sm font-medium" style={{ color: t.subtext }}>Email</span>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2" style={{ color: t.subtext }} />
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-11 pr-4 py-3 rounded-2xl border outline-none"
                  style={{ background: t.inputBg, borderColor: t.cardBorder, color: t.text }}
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium" style={{ color: t.subtext }}>Password</span>
              <div className="relative">
                <LockKeyhole className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2" style={{ color: t.subtext }} />
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="create a password"
                  className="w-full pl-11 pr-4 py-3 rounded-2xl border outline-none"
                  style={{ background: t.inputBg, borderColor: t.cardBorder, color: t.text }}
                />
              </div>
            </label>

            <Button onClick={handleSave} className="rounded-full px-6">
              Save account
            </Button>

            <div className="flex items-center gap-2 text-sm" style={{ color: t.subtext }}>
              <CheckCircle2 className="w-4 h-4" style={{ color: t.accent }} />
              {saved ? "saved locally" : "your info stays on this device"}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}