import { Link } from "wouter";
import { ArrowLeft, HelpCircle, Mail, MessageSquare } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-primary hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>
        
        <div className="flex items-center mb-8">
          <HelpCircle className="h-8 w-8 text-primary mr-3" />
          <h1 className="text-2xl font-bold text-gray-900">Help & Support</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-primary/20 to-primary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Chat Support</h3>
              <p className="text-gray-500 mb-4">Get instant help from our support team through live chat.</p>
              <Button variant="outline" className="w-full">Start Chat</Button>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-primary/20 to-primary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Email Support</h3>
              <p className="text-gray-500 mb-4">Send us an email and we'll get back to you within 24 hours.</p>
              <Button variant="outline" className="w-full">Contact Us</Button>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-primary/20 to-primary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <HelpCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Knowledge Base</h3>
              <p className="text-gray-500 mb-4">Browse through our comprehensive documentation and tutorials.</p>
              <Button variant="outline" className="w-full">View Resources</Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How do I create a new query?</AccordionTrigger>
              <AccordionContent>
                To create a new query, navigate to the dashboard and use the query input field at the top of the page. 
                Type your question in natural language such as "Show me sales data from last quarter" and click the 
                submit button or press Enter.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger>What types of queries are supported?</AccordionTrigger>
              <AccordionContent>
                Our GenAI Analytics tool supports a wide range of natural language queries, including trend analysis, 
                comparative analysis, forecasting, and anomaly detection. You can ask questions about sales, marketing, 
                user behavior, performance metrics, and more.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger>How can I export or share my results?</AccordionTrigger>
              <AccordionContent>
                Once your query results are displayed, you can use the export button in the top right corner of the 
                results panel to download as CSV, Excel, or PDF. To share results with colleagues, use the share button 
                to generate a unique link or send directly via email.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger>Is there a limit to how many queries I can run?</AccordionTrigger>
              <AccordionContent>
                The number of queries you can run depends on your subscription plan. Free accounts are limited 
                to 10 queries per day, while professional accounts have unlimited queries. Check your account 
                settings to view your current plan and usage.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5">
              <AccordionTrigger>How do I interpret the results?</AccordionTrigger>
              <AccordionContent>
                Each query result includes visualizations, key insights, and explanations. The system automatically 
                highlights important patterns and trends in your data. For more detailed analysis, hover over or 
                click on different parts of the visualization for additional information.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Video Tutorials</h2>
          <p className="text-gray-500 mb-6">Learn how to use the GenAI Analytics dashboard with our step-by-step video guides.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-md p-4">
              <div className="aspect-video bg-gray-100 rounded-md flex items-center justify-center mb-3">
                <span className="text-gray-400">Getting Started Video</span>
              </div>
              <h3 className="font-medium">Getting Started Guide</h3>
              <p className="text-sm text-gray-500">Learn the basics of navigating the dashboard</p>
            </div>
            
            <div className="border rounded-md p-4">
              <div className="aspect-video bg-gray-100 rounded-md flex items-center justify-center mb-3">
                <span className="text-gray-400">Advanced Queries Video</span>
              </div>
              <h3 className="font-medium">Advanced Query Techniques</h3>
              <p className="text-sm text-gray-500">Master complex data analysis queries</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}