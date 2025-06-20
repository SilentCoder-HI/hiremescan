import { Github, Linkedin, Twitter, Mail, Heart, Code, Sparkles } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative mt-20 bg-black/20 backdrop-blur-lg border-t border-white/10">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Creator Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-2 rounded-lg">
                <Code className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">Created by</h3>
            </div>
            <div className="space-y-2">
              <h4 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Hussnain Ali
              </h4>
              <p className="text-gray-400">Full-Stack Developer & AI Enthusiast</p>
              <p className="text-sm text-gray-500 leading-relaxed">
                Passionate about creating AI-powered solutions that help people advance their careers. Combining modern
                web technologies with cutting-edge AI to solve real-world problems.
              </p>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-green-500 to-teal-500 p-2 rounded-lg">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">Built With</h3>
            </div>
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                {[
                  "Next.js 15",
                  "React",
                  "TypeScript",
                  "Tailwind CSS",
                  "OpenAI API",
                  "AI SDK",
                  "Vercel",
                  "shadcn/ui",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-white/10 text-gray-300 rounded-full text-sm border border-white/20 hover:bg-white/20 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-4">
                Leveraging the latest in AI and web technologies to deliver exceptional user experiences.
              </p>
            </div>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-2 rounded-lg">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">Connect</h3>
            </div>
            <div className="space-y-3">
              <a
                href="https://github.com/SilentCoder-HI/"
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group"
              >
                <Github className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span>GitHub</span>
              </a>
              <a
                href="https://linkedin.com/in/alexjohnson"
                className="flex items-center gap-3 text-gray-400 hover:text-blue-400 transition-colors group"
              >
                <Linkedin className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://twitter.com/alexjohnson"
                className="flex items-center gap-3 text-gray-400 hover:text-blue-400 transition-colors group"
              >
                <Twitter className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span>Twitter</span>
              </a>
              <a
                href="mailto:alex@hiremescan.com"
                className="flex items-center gap-3 text-gray-400 hover:text-purple-400 transition-colors group"
              >
                <Mail className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span>Email</span>
              </a>
              <a
                href="https://silentcoder-portfolio.vercel.app/"
                className="flex items-center gap-3 text-gray-400 hover:text-green-400 transition-colors group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Code className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span>Portfolio</span>
              </a>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-gray-400">
            <span>© 2025 HireMeScan.</span>
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-400 animate-pulse" />
            <span>for job seekers worldwide</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
