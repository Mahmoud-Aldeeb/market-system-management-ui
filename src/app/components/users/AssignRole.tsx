import React from "react";
import CustomInput from "../common/CustomInput";

interface AssignRoleProps {
  value: { page: string; permission: string };
  onChange: (data: { page?: string; permission?: string }) => void;
}

export default function AssignRole({ value, onChange }: AssignRoleProps) {
  return (
    <div className="assign-role">
      <div className="assign-page">
        <CustomInput
          list="pagename"
          placeholder="Assign Page"
          type="text"
          onchange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange({ page: e.target.value })
          }
        />
        <datalist id="pagename">
          <option value="page1" />
          <option value="page2" />
          <option value="page3" />
          <option value="page4" />
          <option value="page5" />
        </datalist>
      </div>
      <div className="permisson-on-page">
        <select
          value={value.permission}
          onChange={(e) => onChange({ permission: e.target.value })}
        >
          <option value="">Select Permission</option>
          <option value="Create">Create</option>
          <option value="Read">Read</option>
          <option value="Update">Update</option>
          <option value="Delete">Delete</option>
          <option value="Super">Super</option>
        </select>
      </div>
    </div>
  );
}
