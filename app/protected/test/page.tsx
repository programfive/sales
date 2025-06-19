'use client';

import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';

export default function TestPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    // Obtener el usuario actual
    const getUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error) {
        console.error('Error getting user:', error);
      } else {
        setUser(user);
      }
      setLoading(false);
    };

    getUser();

    // Escuchar cambios de autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!user) {
    return <div>No hay usuario autenticado</div>;
  }

  return (
    <div>
      <h1>Usuario Actual (Cliente)</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}
