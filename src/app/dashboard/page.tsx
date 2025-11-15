'use client';

import { useState } from 'react';
import Link from 'next/link';
import { trpc } from '~/utils/trpc';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';

export default function DashboardPage() {
  const [formData, setFormData] = useState({ name: '', location: '' });
  const [showForm, setShowForm] = useState(false);

  // ✅ Query hook - automatically sends GET request
  const { data: restaurants, isLoading, refetch } = trpc.restaurant.getAll.useQuery();

  // ✅ Mutation hook - for creating restaurant
  const createRestaurantMutation = trpc.restaurant.create.useMutation({
    onSuccess: () => {
      setFormData({ name: '', location: '' });
      setShowForm(false);
      refetch(); // Refetch restaurants list
    },
  });

  const handleCreateRestaurant = async (e: React.FormEvent) => {
    e.preventDefault();
    await createRestaurantMutation.mutateAsync(formData);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Your Restaurants</h2>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Add Restaurant'}
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Restaurant</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateRestaurant} className="space-y-4">
              <div>
                <Label htmlFor="name">Restaurant Name</Label>
                <Input
                  id="name"
                  placeholder="The Pizza Place"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="123 Main St, City"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={createRestaurantMutation.isPending}
              >
                {createRestaurantMutation.isPending ? 'Creating...' : 'Create Restaurant'}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants?.map((restaurant) => (
          <Link key={restaurant.id} href={`/dashboard/restaurants/${restaurant.id}`}>
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle>{restaurant.name}</CardTitle>
                <CardDescription>{restaurant.location}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p>📁 {restaurant._count?.categories || 0} categories</p>
                  <p>🍽️ {restaurant._count?.dishes || 0} dishes</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {!restaurants || restaurants.length === 0 && (
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-slate-500">No restaurants yet. Create one to get started!</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
