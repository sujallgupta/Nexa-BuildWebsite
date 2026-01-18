import logo from './logo.svg';

export const assets = {
    logo
};

export const appPlans = [
    {
        id: 'starter',
        name: 'Starter',
        price: '$5',
        credits: 50,
        description: 'Get started with Nexa and build your first AI-powered website.',
        features: [
            '2 website creations',
            'Limited revisions',
            'Standard AI models',
            'Email support',
            'Basic analytics',
        ],
    },
    {
        id: 'pro',
        name: 'Pro',
        price: '$28',
        credits: 200,
        popular: true,
        description: 'Best for creators and professionals building multiple projects.',
        features: [
            '40 website creations',
            'Extended revisions',
            'Advanced AI models',
            'Priority email support',
            'Advanced analytics',
        ],
    },
    {
        id: 'enterprise',
        name: 'Enterprise',
        price: '$90',
        credits: 1000,
        description: 'Built for teams and businesses scaling with AI.',
        features: [
            '200 website creations',
            'Unlimited revisions',
            'Premium AI models',
            'Email + chat support',
            'Advanced analytics & reporting',
        ],
    },
]
export const placeholders = [
  "Ask Nexa to create a website for my startup...",
  "Ask Nexa to create a landing page for my app...",
  "Ask Nexa to create a portfolio website for me...",
  "Ask Nexa to design an AI product website...",
  "Ask Nexa to build a SaaS website with login and dashboard...",
  "Ask Nexa to create a product launch page...",
  "Ask Nexa to build a business website for my company...",
  "Ask Nexa to design a personal brand website...",
  "Ask Nexa to create a website to validate my idea...",
  "Ask Nexa to build a startup MVP website...",
  "Ask Nexa to create a website like Notion / Stripe / Airbnb...",
  "Ask Nexa to design a modern website from my idea...",
];

export const quickPrompts = [
  {
    label: "Startup Website",
    prompt:
      "Create a modern startup website with a strong hero section, clear value proposition, product overview, feature highlights, testimonials, and early access signup."
  },
  {
    label: "SaaS Product",
    prompt:
      "Build a SaaS product website with feature sections, pricing tables, onboarding flow, authentication pages, and a clean user dashboard layout."
  },
  {
    label: "AI Tool",
    prompt:
      "Create a professional AI product website with prompt input interface, use cases, live demos, pricing plans, and documentation pages."
  },
  {
    label: "Product Launch",
    prompt:
      "Design a high-conversion product launch website with waitlist signup, feature highlights, social proof, FAQs, and strong call-to-action sections."
  },
  {
    label: "Startup Portfolio",
    prompt:
      "Build a startup-style portfolio website to showcase projects, case studies, achievements, testimonials, and a strong personal brand presence."
  },
  {
    label: "Tech Company",
    prompt:
      "Create a modern tech company website with services, solutions, blog, careers page, case studies, and a customer contact system."
  },
];


export const iframeScript = `
        <style id="ai-preview-style">
        .ai-selected-element {
            outline: 2px solid #6366f1 !important;
        }
        </style>
        <script id="ai-preview-script">
        (function () {
            // If this HTML is opened directly (not in an iframe), do nothing.
            if (window === window.parent) {
            return;
            }

            let selectedElement = null;

            function clearSelected() {
            if (selectedElement) {
                selectedElement.classList.remove('ai-selected-element');
                selectedElement.removeAttribute('data-ai-selected');
                selectedElement.style.outline = '';
                selectedElement = null;
            }
            }

            document.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            clearSelected();

            const target = e.target;

            // Don't select body or html
            if (!target || target.tagName === 'BODY' || target.tagName === 'HTML') {
                window.parent.postMessage({ type: 'CLEAR_SELECTION' }, '*');
                return;
            }

            selectedElement = target;
            selectedElement.classList.add('ai-selected-element');
            selectedElement.setAttribute('data-ai-selected', 'true');

            const computedStyle = window.getComputedStyle(selectedElement);

            window.parent.postMessage({
                type: 'ELEMENT_SELECTED',
                payload: {
                tagName: selectedElement.tagName,
                className: selectedElement.className,
                text: selectedElement.innerText,
                styles: {
                    padding: computedStyle.padding,
                    margin: computedStyle.margin,
                    backgroundColor: computedStyle.backgroundColor,
                    color: computedStyle.color,
                    fontSize: computedStyle.fontSize
                }
                }
            }, '*');
            });

            window.addEventListener('message', function (event) {
            if (event.data.type === 'UPDATE_ELEMENT' && selectedElement) {
                const updates = event.data.payload;

                if (updates.className !== undefined) {
                selectedElement.className = updates.className;
                }

                if (updates.text !== undefined) {
                selectedElement.innerText = updates.text;
                }

                if (updates.styles) {
                Object.assign(selectedElement.style, updates.styles);
                }
            } else if (event.data.type === 'CLEAR_SELECTION_REQUEST') {
                clearSelected();

                // extra safety: remove our class + outline from any stray elements
                document.querySelectorAll('.ai-selected-element,[data-ai-selected]').forEach(function (el) {
                el.classList.remove('ai-selected-element');
                el.removeAttribute('data-ai-selected');
                el.style.outline = '';
                });
            }
            });
        })();
        </script>
`;