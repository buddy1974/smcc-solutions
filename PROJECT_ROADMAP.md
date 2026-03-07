SYSTEM MATURITY LEVEL: Funnel Optimization Phase 
SMCC Future Automation Reminder
Enrollment Automation (Planned Upgrade)

Current enrollment system:

Visitor
→ SMCC website
→ /payment page
→ PayUnit checkout
→ Manual enrollment tracking

Automation will be implemented later when enrollment volume increases.

Future Automation Architecture

When implemented, the system will work like this:

PayUnit payment
→ PayUnit webhook
→ Cloudflare Worker API
→ Enrollment database
→ Automatic onboarding email
→ WhatsApp orientation message
→ Student assigned to cohort

Automation Trigger Conditions

Automation should be implemented when:

• SMCC reaches 10+ enrollments per week, OR
• multiple programs are active (Cohort II, Cohort III, 7 Pillars, events).

Goal of Automation

Automation will allow SMCC to:

• automatically record student enrollments
• generate cohort lists
• trigger onboarding emails
• create WhatsApp orientation groups
• track program performance

Required Infrastructure

When automation is implemented we will add:

• PayUnit webhook endpoint
• Cloudflare Worker backend
• enrollment database
• admin dashboard for students

Status

Current stage:

Payment-first enrollment system implemented.

Automation postponed intentionally to avoid overengineering before funnel validation.