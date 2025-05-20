import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

interface PricingTier {
    name: string
    price: string
    description: string
    features: string[]
    cta: string
}

const pricingTiers: PricingTier[] = [
    {
        name: "Basic",
        price: "$5/month",
        description: "Ideal for beginners and occasional practice.",
        features: [
            "Basic lessons",
            "Limited practice sessions",
            "Progress tracking",
            "Email support",
        ],
        cta: "Get Started",
    },
    {
        name: "Pro",
        price: "$10/month",
        description: "Ideal for intermediate learners and regular practice.",
        features: [
            "All Basic features",
            "Advanced lessons",
            "Unlimited practice sessions",
            "Priority support",
            "Progress analytics",
        ],
        cta: "Upgrade to Pro",
    },
    {
        name: "Premium",
        price: "$20/month",
        description: "Ideal for advanced learners and dedicated practice.",
        features: [
            "All Pro features",
            "Expert-led workshops",
            "1-on-1 coaching sessions",
            "Custom learning paths",
            "Advanced analytics",
        ],
        cta: "Go Premium",
    },
]

export const PricingSection = () => {
    return (
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                            Pricing
                        </div>
                        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                            Choose the plan that's right for you
                        </h2>
                        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Our pricing options are designed to fit your learning needs and budget.
                        </p>
                    </div>
                </div>

                <div className="mx-auto grid max-w-5xl items-stretch gap-6 py-12 lg:grid-cols-3 lg:gap-12">
                {pricingTiers.map((tier, index) => (
                    <div
                        key={index}
                        className="flex flex-col justify-between rounded-lg border bg-background p-6 shadow-sm min-h-[450px]"
                    >
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <h3 className="text-xl font-bold">{tier.name}</h3>
                                <p className="text-muted-foreground">{tier.description}</p>
                            </div>
                            <div className="text-4xl font-bold">{tier.price}</div>
                            <ul className="space-y-2">
                                {tier.features.map((feature, featureIndex) => (
                                    <li key={featureIndex} className="flex items-center gap-2">
                                        <Check className="h-4 w-4 text-primary" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="pt-2">
                            <Button className="w-full">
                                {tier.cta || "Get Started"}
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
            </div>
        </section>
    )
} 