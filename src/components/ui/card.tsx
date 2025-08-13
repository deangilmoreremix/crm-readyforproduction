import * as React from "react";
import { cn } from "../../lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn(
			"rounded-xl border bg-white text-gray-900 shadow-sm dark:bg-slate-900 dark:text-gray-100 dark:border-slate-700/50",
			className
		)}
		{...props}
	/>
));
Card.displayName = "Card";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => (
		<div ref={ref} className={cn("p-6", className)} {...props} />
	)
);
CardContent.displayName = "CardContent";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => (
		<div ref={ref} className={cn("p-6 pb-0", className)} {...props} />
	)
);
CardHeader.displayName = "CardHeader";

export { Card, CardContent, CardHeader };
export default Card;
