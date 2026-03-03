const bashConfig = ['bin/bash','-c'];
export const commands = {
    python: function(code :string){
        const runCommand=`echo '${code}' > test.py && python test.py`;
        return [...bashConfig,runCommand];
    },
    cpp: function(code :string){
        const runCommand=`mkdir app && cd app && echo '${code}' > test.cpp && g++ test.cpp -o run && ./run`;
        return [...bashConfig,runCommand];
    }
}