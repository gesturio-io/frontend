interface Testimonial {
    initials: string
    name: string
    role: string
    quote: string
}

const testimonials: Testimonial[] = [
    {
        initials: "JD",
        name: "John Doe",
        role: "ASL Student",
        quote: "Gesturio has completely transformed how I learn sign language. The interactive lessons and real-time feedback have helped me progress faster than I ever imagined.",
    },
    {
        initials: "AS",
        name: "Alice Smith",
        role: "Sign Language Teacher",
        quote: "As a teacher, I'm impressed by how well Gesturio structures its lessons. The platform makes it easy for students to practice and track their progress effectively.",
    },
    {
        initials: "MB",
        name: "Michael Brown",
        role: "Parent",
        quote: "My child has been using Gesturio to learn sign language, and I've seen remarkable improvement in their skills. The platform is engaging and easy to use.",
    },
]

export const TestimonialsSection = () => {
    return (
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                            Testimonials
                        </div>
                        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                            What our users say
                        </h2>
                        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Hear from people who have transformed their sign language learning journey with Gesturio.
                        </p>
                    </div>
                </div>
                <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="flex flex-col justify-center space-y-4 rounded-lg border bg-background p-6 shadow-sm"
                        >
                            <div className="flex items-center gap-4">
                                <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
                                    <span className="text-lg font-semibold">{testimonial.initials}</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold">{testimonial.name}</h3>
                                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                </div>
                            </div>
                            <p className="text-muted-foreground">{testimonial.quote}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
} 