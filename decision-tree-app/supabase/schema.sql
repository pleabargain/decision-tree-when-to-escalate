-- Create the decision_trees table to store the decision tree structures
CREATE TABLE decision_trees (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  tree_data JSONB NOT NULL,
  version TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create the decision_paths table to store user decision paths (optional)
CREATE TABLE decision_paths (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID,
  tree_id UUID REFERENCES decision_trees(id) ON DELETE CASCADE,
  path JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to automatically update the updated_at column
CREATE TRIGGER update_decision_trees_updated_at
BEFORE UPDATE ON decision_trees
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Create row level security policies
ALTER TABLE decision_trees ENABLE ROW LEVEL SECURITY;
ALTER TABLE decision_paths ENABLE ROW LEVEL SECURITY;

-- Create policies for decision_trees
CREATE POLICY "Allow public read access to decision_trees"
  ON decision_trees
  FOR SELECT
  USING (true);

CREATE POLICY "Allow authenticated users to create decision_trees"
  ON decision_trees
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update their own decision_trees"
  ON decision_trees
  FOR UPDATE
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

-- Create policies for decision_paths
CREATE POLICY "Allow users to read their own decision_paths"
  ON decision_paths
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Allow users to create their own decision_paths"
  ON decision_paths
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Insert a sample decision tree
INSERT INTO decision_trees (name, description, version, tree_data)
VALUES (
  'Issue Escalation Decision Tree',
  'Determines whether an issue should be escalated to management',
  '1.0',
  '{
    "tree_id": "escalation_decision_tree_v1",
    "name": "Issue Escalation Decision Tree",
    "description": "Determines whether an issue should be escalated to management",
    "version": "1.0",
    "root_node_id": "q1",
    "nodes": {
      "q1": {
        "id": "q1",
        "type": "question",
        "text": "What is the severity level of the issue?",
        "help_text": "Consider the impact on business operations, customers, or employees",
        "options": [
          {
            "text": "Critical - Severe impact on business operations",
            "next_node_id": "q2_critical"
          },
          {
            "text": "High - Significant impact but workarounds exist",
            "next_node_id": "q2_high"
          },
          {
            "text": "Medium - Limited impact on specific functions",
            "next_node_id": "q2_medium"
          },
          {
            "text": "Low - Minimal impact, mostly inconvenience",
            "next_node_id": "q3_low"
          }
        ]
      },
      "q2_critical": {
        "id": "q2_critical",
        "type": "question",
        "text": "Is the issue affecting multiple departments or teams?",
        "options": [
          {
            "text": "Yes",
            "next_node_id": "r1_escalate"
          },
          {
            "text": "No",
            "next_node_id": "q3_critical"
          }
        ]
      },
      "q3_critical": {
        "id": "q3_critical",
        "type": "question",
        "text": "Do you have the authority to resolve this issue?",
        "options": [
          {
            "text": "Yes",
            "next_node_id": "r2_handle"
          },
          {
            "text": "No",
            "next_node_id": "r1_escalate"
          }
        ]
      },
      "q2_high": {
        "id": "q2_high",
        "type": "question",
        "text": "Is this issue time-sensitive (needs resolution within 24 hours)?",
        "options": [
          {
            "text": "Yes",
            "next_node_id": "q3_high_urgent"
          },
          {
            "text": "No",
            "next_node_id": "q3_high_normal"
          }
        ]
      },
      "q3_high_urgent": {
        "id": "q3_high_urgent",
        "type": "question",
        "text": "Do you have all the resources needed to resolve this issue?",
        "options": [
          {
            "text": "Yes",
            "next_node_id": "r2_handle"
          },
          {
            "text": "No",
            "next_node_id": "r1_escalate"
          }
        ]
      },
      "q3_high_normal": {
        "id": "q3_high_normal",
        "type": "question",
        "text": "Does this issue involve a key client or high-value project?",
        "options": [
          {
            "text": "Yes",
            "next_node_id": "r1_escalate"
          },
          {
            "text": "No",
            "next_node_id": "r2_handle"
          }
        ]
      },
      "q2_medium": {
        "id": "q2_medium",
        "type": "question",
        "text": "Has this issue occurred before?",
        "options": [
          {
            "text": "Yes, frequently",
            "next_node_id": "r1_escalate"
          },
          {
            "text": "Yes, but rarely",
            "next_node_id": "r2_handle"
          },
          {
            "text": "No, this is the first time",
            "next_node_id": "q3_medium"
          }
        ]
      },
      "q3_medium": {
        "id": "q3_medium",
        "type": "question",
        "text": "Could this issue potentially grow in severity if not addressed properly?",
        "options": [
          {
            "text": "Yes",
            "next_node_id": "r1_escalate"
          },
          {
            "text": "No",
            "next_node_id": "r2_handle"
          }
        ]
      },
      "q3_low": {
        "id": "q3_low",
        "type": "question",
        "text": "Is this issue part of a pattern of similar issues?",
        "options": [
          {
            "text": "Yes",
            "next_node_id": "r1_escalate"
          },
          {
            "text": "No",
            "next_node_id": "r2_handle"
          }
        ]
      },
      "r1_escalate": {
        "id": "r1_escalate",
        "type": "result",
        "text": "Based on your responses, this issue should be escalated to management.",
        "result": "escalate",
        "title": "Escalate to Management",
        "description": "This issue requires management attention due to its severity, scope, or the authority needed to resolve it.",
        "next_steps": [
          "Document the issue details",
          "Contact your direct manager",
          "Prepare relevant data or evidence",
          "Schedule a meeting if necessary"
        ]
      },
      "r2_handle": {
        "id": "r2_handle",
        "type": "result",
        "text": "Based on your responses, this issue can be handled at your level without escalation.",
        "result": "handle",
        "title": "Handle at Current Level",
        "description": "This issue can be addressed without management escalation.",
        "next_steps": [
          "Proceed with resolution",
          "Document your approach",
          "Inform stakeholders of your progress",
          "Set a deadline for resolution"
        ]
      }
    }
  }'::jsonb
);
