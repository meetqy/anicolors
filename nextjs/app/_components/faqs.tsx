import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqData = [
  {
    question: "What is HiColors?",
    answer:
      "HiColors is a platform that curates and generates color palettes from popular anime, games, and illustrations. You can also upload your own images to extract beautiful color palettes instantly.",
  },
  {
    question: "What kind of sources are used for palettes?",
    answer: "anime, games, animated films, concept art, and fan illustrations.",
  },
  {
    question: "How do I generate a color palette from an image?",
    answer: "Simply click the “Create Palette” button on the homepage, upload your image, and HiColors will extract the dominant colors for you. The process is fast and automatic.",
  },
  {
    question: "Can I save or download palettes?",
    answer: "Yes, every palette page includes a download button to save the palette as an image or copy the HEX values.",
  },
  {
    question: "Is HiColors free to use?",
    answer: "Yes, HiColors is 100% free for everyone. No account or registration is required.",
  },
  {
    question: "How often are new palettes added?",
    answer: "New palettes are added daily. We frequently update the site with new content from trending shows and games.",
  },
  {
    question: "How is HiColors different from ColorHunt?",
    answer:
      "ColorHunt offers general-purpose, user-submitted color palettes, while HiColors focuses on palettes extracted from visual media like anime, games, and illustrations, providing emotional insights, usage recommendations, and full shade expansions for each color.",
  },
];

export function FAQs() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
        <p className="text-muted-foreground text-lg">Find answers to common questions about our color palettes and tools.</p>
      </div>

      <Accordion type="single" collapsible className="space-y-4">
        {faqData.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="border border-border rounded-lg px-6 bg-card">
            <AccordionTrigger className="text-left font-medium hover:no-underline py-6">{faq.question}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-6 pt-0">{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
        <AccordionItem value=""></AccordionItem>
      </Accordion>
    </section>
  );
}
