import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Please check your .env.local file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type DecisionTreeNode = {
  id: string;
  type: 'question' | 'result';
  text: string;
  help_text?: string;
  options?: {
    text: string;
    next_node_id: string;
  }[];
  result?: 'escalate' | 'handle';
  title?: string;
  description?: string;
  next_steps?: string[];
};

export type DecisionTree = {
  tree_id: string;
  name: string;
  description: string;
  version: string;
  root_node_id: string;
  nodes: Record<string, DecisionTreeNode>;
};

export async function fetchDecisionTree(treeId: string): Promise<DecisionTree | null> {
  try {
    const { data, error } = await supabase
      .from('decision_trees')
      .select('*')
      .eq('id', treeId)
      .single();

    if (error) {
      console.error('Error fetching decision tree:', error);
      return null;
    }

    return data.tree_data as DecisionTree;
  } catch (error) {
    console.error('Error fetching decision tree:', error);
    return null;
  }
}

// This function will be used to save the user's decision path if needed
export async function saveDecisionPath(
  userId: string,
  treeId: string,
  path: { nodeId: string; answer: string }[]
) {
  try {
    const { data, error } = await supabase.from('decision_paths').insert({
      user_id: userId,
      tree_id: treeId,
      path,
      created_at: new Date().toISOString(),
    });

    if (error) {
      console.error('Error saving decision path:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error saving decision path:', error);
    return null;
  }
}
