import { createFileRoute, Link } from "@tanstack/react-router";
import { Activity, Apple, Calendar, ChevronRight, Dumbbell, DumbbellIcon, Plus, TrendingUp, Users } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Progress } from "~/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-muted-foreground">+28 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Memberships</CardTitle>
            <Dumbbell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">118</div>
            <p className="text-xs text-muted-foreground">+5 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Diet Plans Created</CardTitle>
            <Apple className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">+12 from last month</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <Button className="h-auto justify-start gap-2 p-4" variant="outline">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                <Users className="h-5 w-5 text-green-700" />
              </div>
              <div className="flex flex-col items-start">
                <span>New Customer</span>
                <span className="text-xs text-muted-foreground">Add a new customer</span>
              </div>
            </Button>
            <Button className="h-auto justify-start gap-2 p-4" variant="outline">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                <Dumbbell className="h-5 w-5 text-green-700" />
              </div>
              <div className="flex flex-col items-start">
                <span>New Membership</span>
                <span className="text-xs text-muted-foreground">Create a membership</span>
              </div>
            </Button>
            <Button className="h-auto justify-start gap-2 p-4" variant="outline">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                <Apple className="h-5 w-5 text-green-700" />
              </div>
              <div className="flex flex-col items-start">
                <span>New Diet Plan</span>
                <span className="text-xs text-muted-foreground">Create a diet plan</span>
              </div>
            </Button>
            <Button className="h-auto justify-start gap-2 p-4" variant="outline">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                <Calendar className="h-5 w-5 text-green-700" />
              </div>
              <div className="flex flex-col items-start">
                <span>Schedule Session</span>
                <span className="text-xs text-muted-foreground">Book an appointment</span>
              </div>
            </Button>
            <Button className="h-auto justify-start gap-2 p-4" variant="outline">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                <DumbbellIcon className="h-5 w-5 text-green-700" />
              </div>
              <div className="flex flex-col items-start">
                <span>New Workout Plans</span>
                <span className="text-xs text-muted-foreground">Create new workouts for customers.</span>
              </div>
            </Button>
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Customers</CardTitle>
            <CardDescription>You have 5 new customers this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Sarah Johnson", date: "Today" },
                { name: "Michael Chen", date: "Yesterday" },
                { name: "Emma Davis", date: "Yesterday" },
                { name: "Robert Wilson", date: "2 days ago" },
                { name: "Olivia Martinez", date: "3 days ago" },
              ].map((customer) => (
                <div key={customer.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                      {customer.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium">{customer.name}</div>
                      <div className="text-sm text-muted-foreground">Joined {customer.date}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild variant="ghost" className="w-full">
              <Link to="/clients">
                View all customers
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
      <div>
        <Tabs defaultValue="upcoming">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="upcoming">Upcoming Sessions</TabsTrigger>
              <TabsTrigger value="expiring">Expiring Memberships</TabsTrigger>
              <TabsTrigger value="diet">Diet Plan Updates</TabsTrigger>
            </TabsList>
            <Button size="sm">
              <Plus className="mr-1 h-4 w-4" />
              Add New Customer
            </Button>
          </div>
          <TabsContent value="upcoming" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Sessions</CardTitle>
                <CardDescription>You have 8 sessions scheduled for this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Sarah Johnson", time: "Today, 2:00 PM", type: "Diet Consultation" },
                    { name: "Michael Chen", time: "Today, 4:30 PM", type: "Progress Review" },
                    { name: "Emma Davis", time: "Tomorrow, 10:00 AM", type: "Initial Assessment" },
                    { name: "Robert Wilson", time: "Tomorrow, 1:15 PM", type: "Diet Adjustment" },
                  ].map((session) => (
                    <div key={session.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                          {session.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium">{session.name}</div>
                          <div className="text-sm text-muted-foreground">{session.type}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{session.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="ghost" className="w-full">
                  <Link to="/">
                    View all sessions
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="expiring" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Expiring Memberships</CardTitle>
                <CardDescription>Memberships expiring in the next 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Robert Wilson", date: "Expires in 5 days", type: "Premium Plan" },
                    { name: "Olivia Martinez", date: "Expires in 8 days", type: "Standard Plan" },
                    { name: "James Taylor", date: "Expires in 12 days", type: "Premium Plan" },
                    { name: "Sophia Anderson", date: "Expires in 15 days", type: "Basic Plan" },
                  ].map((member) => (
                    <div key={member.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                          {member.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium">{member.name}</div>
                          <div className="text-sm text-muted-foreground">{member.type}</div>
                        </div>
                      </div>
                      <div className="text-sm font-medium text-yellow-600">{member.date}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="ghost" className="w-full">
                  <Link to="/">
                    View all memberships
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="diet" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Diet Plan Updates</CardTitle>
                <CardDescription>Recent diet plan changes and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Sarah Johnson", date: "Updated today", type: "Weight Loss Plan" },
                    { name: "Michael Chen", date: "Updated 2 days ago", type: "Muscle Gain Plan" },
                    { name: "Emma Davis", date: "Updated 3 days ago", type: "Balanced Diet Plan" },
                    { name: "Olivia Martinez", date: "Updated 5 days ago", type: "Vegetarian Plan" },
                  ].map((plan) => (
                    <div key={plan.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                          {plan.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium">{plan.name}</div>
                          <div className="text-sm text-muted-foreground">{plan.type}</div>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">{plan.date}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="ghost" className="w-full">
                  <Link to="/">
                    View all diet plans
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );

}
